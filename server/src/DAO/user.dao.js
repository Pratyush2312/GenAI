import { UserModel } from "../models/user.model.js";

/**
 * @typedef {import("mongoose").Document & {
 *   _id: import("mongoose").Types.ObjectId,
 *   name: string,
 *   email: string,
 *   password?: string,
 *   refreshToken?: string | null
 * }} UserDocument
 */

/**
 * Create and persist a new account.
 * @param {{name: string, email: string, password: string}} input Account details.
 * @returns {Promise<UserDocument>}
 * @throws {Error} When persistence fails.
 */
export async function createUser(input) {
  return UserModel.create(input);
}

/**
 * Find an account by its normalized email address, including its password hash.
 * @param {string} email Normalized email address.
 * @returns {Promise<UserDocument | null>}
 */
export async function findUserByEmail(email) {
  return UserModel.findOne({ email }).select("+password").exec();
}

/**
 * Find an account by its identifier.
 * @param {string} id Account identifier.
 * @returns {Promise<UserDocument | null>}
 */
export async function findUserById(id) {
  return UserModel.findById(id).exec();
}

/**
 * Find an account including its persisted refresh token.
 * @param {string} id Account identifier.
 * @returns {Promise<UserDocument | null>}
 */
export async function findUserByIdWithRefreshToken(id) {
  return UserModel.findById(id).select("+refreshToken").exec();
}

/**
 * Persist the latest refresh token for an account.
 * @param {string | import("mongoose").Types.ObjectId} id Account identifier.
 * @param {string} refreshToken New refresh token.
 * @returns {Promise<UserDocument | null>}
 */
export async function updateRefreshToken(id, refreshToken) {
  return UserModel.findByIdAndUpdate(id, { refreshToken }, { new: true }).select("+refreshToken").exec();
}

/**
 * Invalidate a persisted refresh token.
 * @param {string | import("mongoose").Types.ObjectId} id Account identifier.
 * @returns {Promise<UserDocument | null>}
 */
export async function clearRefreshToken(id) {
  return UserModel.findByIdAndUpdate(id, { refreshToken: null }, { new: true }).exec();
}
