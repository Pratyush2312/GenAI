import { ConversationModel } from "../models/conversation.model.js";

/**
 * Create a conversation for an account.
 * @param {string | import("mongoose").Types.ObjectId} userId Account identifier.
 * @param {string} title Conversation title.
 * @returns {Promise<import("mongoose").Document>}
 */
export async function createConversation(userId, title) {
  return ConversationModel.create({ user: userId, title });
}

/**
 * Find a conversation only when it belongs to the requesting account.
 * @param {string | import("mongoose").Types.ObjectId} conversationId Conversation identifier.
 * @param {string | import("mongoose").Types.ObjectId} userId Account identifier.
 * @returns {Promise<import("mongoose").Document | null>}
 */
export async function findConversationByIdAndUser(conversationId, userId) {
  return ConversationModel.findOne({ _id: conversationId, user: userId }).exec();
}

/**
 * List an account's conversations, most recently updated first.
 * @param {string | import("mongoose").Types.ObjectId} userId Account identifier.
 * @returns {Promise<import("mongoose").Document[]>}
 */
export async function findConversationsByUser(userId) {
  return ConversationModel.find({ user: userId }).sort({ lastUpdated: -1 }).exec();
}

/**
 * Update the timestamp of the most recent message in a conversation.
 * @param {string | import("mongoose").Types.ObjectId} conversationId Conversation identifier.
 * @param {Date} lastMessageAt Timestamp of the latest message.
 * @returns {Promise<import("mongoose").Document | null>}
 */
export async function updateConversationLastMessage(conversationId, lastMessageAt) {
  return ConversationModel.findByIdAndUpdate(
    conversationId,
    { lastMessage: lastMessageAt },
    { new: true, runValidators: true }
  ).exec();
}

/**
 * @param {string | import("mongoose").Types.ObjectId} userId Owner Identifier.
 * @returns {Promise<import("mongoose").Document[]>}
 */
export async function getAllConversationsByUser(userId) { 
  return ConversationModel.find({ user: userId }).exec();
}
