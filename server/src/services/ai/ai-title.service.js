import { ChatGroq } from '@langchain/groq';
import { config } from './../../config/env.js';
import * as z from 'zod';
import { HumanMessage, SystemMessage } from 'langchain';
const model = new ChatGroq({
    model: "qwen/qwen3.8-27b",
    apiKey: config.GROQ_API_KEY
})

const structureModel = model.withStructuredOutput(z.object({
    title: z.string().min(1).max(60).describe("The title of the conversation on the basis of user's message")
}))

/**
 * @function generateTitle
 * @description Generates a title for a conversation based on the user's message.
 * @param {string} userMessage - The user's message for which the title needs to be generated.
 * @returns {Promise<string>} - The generated title.
 */

export const generateTitle = async(message) => { 
    const systemMessage = new SystemMessage(`
        You are an AI assistant that generates a title for a conversation based on the user's message.
        ## Follow these rules to generate the title:
        1. The title should be concise and accurately reflect the content of the user's message.
        2. Avoid using generic titles like "Conversation" or "Chat".
        3. The title should be in title case (capitalize the first letter of each major word).
        4. The title should not be longer than 60 characters.
        5. Focus on the main topic or intent of the user's message to create a relevant title.

        `)
    const humanMessage = new HumanMessage(message);
    const response = await structureModel.invoke([systemMessage, humanMessage]);
    return response;
}