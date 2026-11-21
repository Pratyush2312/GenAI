import { config } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

/**
 * @POST
 * @route /api/v1/conversation
 * @description handle user's message
 * req.body should contain the user message and conversation ID (conversationId is optional)
 */

export const handleMessage = asyncHandler(async (req, res) => { 
    const { content, conversation } = req.body;
    if (!conversation) { 
        /**
         * create a new conversation
         */
    }
})