import { MessageModel } from "../models/message.model.js";

/**
 * Create a message in a conversation.
 * @param {{role: "user" | "assistant" | "tool", content: string, conversationId: string | import("mongoose").Types.ObjectId}} input Message details.
 * @returns {Promise<import("mongoose").Document>}
 */
export async function createMessage({ role, content, conversationId }) {
  return MessageModel.create({ role, content, conversation: conversationId });
}

/**
 * Retrieve a conversation's messages in chronological order.
 * @param {string | import("mongoose").Types.ObjectId} conversationId Conversation identifier.
 * @returns {Promise<import("mongoose").Document[]>}
 */
export async function findMessagesByConversation(conversationId) {
  return MessageModel.find({ conversation: conversationId }).exec();
}
