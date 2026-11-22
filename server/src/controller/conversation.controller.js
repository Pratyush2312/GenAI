import { config } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { generateTitle } from './../services/ai/ai-title.service';
import { createConversation, findConversationByIdAndUser } from '../DAO/conversation.dao.js';
import { findMessagesByConversation, createMessage } from '../DAO/message.dao.js';
import { AIMessage, HumanMessage } from "langchain";
import { model } from "mongoose";
/**
 * @POST
 * @route /api/v1/conversation
 * @description handle user's message
 * req.body should contain the user message and conversation ID (conversationId is optional)
 */

export const handleMessage = asyncHandler(async (req, res, next) => {
    const { content, conversation: conversationId } = req.body;
    const user = req.user;
    let conversation = null;
    if (!conversationId) {
        const { title } = await generateTitle(content);
        conversation = await createConversation({ userId: user.id, title });
    }
    else {
        conversation = await findConversationByIdAndUser({ conversationId, userId: user.id });
        if (!conversation) {
            return next(new AppError(404, 'Conversation not found'));
        }
    }
    const messages = (await findMessagesByConversation(conversationId)).map(msg => {
        if (msg.role === 'user') {
            return new HumanMessage(msg.content);
        }
        else if (msg.role === 'assistant') {
            return new AIMessage(msg.content);
        }
        return null
    }).filter(Boolean);
    messages.push(new HumanMessage(content));

    // set headers for server sent events(SSE)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive')

    // send conversation details via SSE
    res.write(`data:${JSON.stringify({ conversationId: conversation.id, title: conversation.title })}\n\n`)

    await createMessage({
        role: "user",
        content,
        conversationId:conversation.id
    })

    let aiChunk = null;
    const stream = await model.stream(messages);
    for await (const chunk of stream) {
        if (aiChunk == null) {
            aiChunk = chunk;
        } else {
            aiChunk = aiChunk.concat(chunk);
        }
        res.write(`data:${JSON.stringify(chunk.content)}\n\n`);
    }

    // End of SSE
    res.end();
    await createMessage({
        role: "assistant",
        content: aiChunk.content,
        conversationId:conversation._id
    })
})