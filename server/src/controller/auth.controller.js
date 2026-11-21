import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  clearRefreshToken,
  createUser,
  findUserByEmail,
  findUserByIdWithRefreshToken,
  updateRefreshToken
} from "../DAO/user.dao.js";
import { config } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { createAccessToken, createRefreshToken } from "../utils/jwt.js";

/** @type {import("express").CookieOptions} */
const cookieOptions = {
  httpOnly: true,
  secure: config.nodeEnv === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/api/v1/auth"
};

const clearCookieOptions = { ...cookieOptions };
delete clearCookieOptions.maxAge;

const toPublicUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email
});

async function issueTokens(user) {
  const tokens = {
    accessToken: createAccessToken({ id: user._id.toString(), email: user.email }),
    refreshToken: createRefreshToken({ id: user._id.toString(), email: user.email })
  };
  await updateRefreshToken(user._id, tokens.refreshToken);
  return tokens;
}

/**
 * Register an account and issue a new access/refresh token pair.
 * @param {import("express").Request} req Registration request.
 * @param {import("express").Response} res Express response.
 * @returns {Promise<import("express").Response>}
 * @throws {Error} When account persistence or token persistence fails.
 */
export const register = asyncHandler(async (req, res) => {
  const user = await createUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  const tokens = await issueTokens(user);
  res.cookie("refreshToken", tokens.refreshToken, cookieOptions);
  return sendSuccess(res, 201, "Account created successfully", {
    accessToken: tokens.accessToken,
    user: toPublicUser(user)
  });
});

/**
 * Authenticate credentials without revealing which value was incorrect.
 * @param {import("express").Request} req Login request.
 * @param {import("express").Response} res Express response.
 * @returns {Promise<import("express").Response>}
 * @throws {import("../utils/AppError.js").AppError} When credentials are invalid.
 */
export const login = asyncHandler(async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  const passwordMatches = user ? await bcrypt.compare(req.body.password, user.password) : false;
  if (!user || !passwordMatches) throw new AppError(401, "Invalid credentials");

  const tokens = await issueTokens(user);
  res.cookie("refreshToken", tokens.refreshToken, cookieOptions);
  return sendSuccess(res, 200, "Login successful", {
    accessToken: tokens.accessToken,
    user: toPublicUser(user)
  });
});

/**
 * Rotate refresh and access tokens after validating the persisted cookie.
 * @param {import("express").Request} req Refresh request.
 * @param {import("express").Response} res Express response.
 * @returns {Promise<import("express").Response>}
 * @throws {import("../utils/AppError.js").AppError} When the cookie or stored token is invalid.
 */
export const refresh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) throw new AppError(401, "Unauthorized");
  const payload = jwt.verify(refreshToken, config.refreshTokenSecret);
  if (typeof payload === "string" || typeof payload.id !== "string") throw new AppError(401, "Unauthorized");

  const user = await findUserByIdWithRefreshToken(payload.id);
  if (!user || user.refreshToken !== refreshToken) throw new AppError(401, "Unauthorized");
  const tokens = await issueTokens(user);
  res.cookie("refreshToken", tokens.refreshToken, cookieOptions);
  return sendSuccess(res, 200, "Session refreshed", {
    accessToken: tokens.accessToken,
    user: toPublicUser(user)
  });
});

/**
 * Invalidate the stored refresh token and clear the session cookie.
 * @param {import("express").Request} req Logout request.
 * @param {import("express").Response} res Express response.
 * @returns {Promise<import("express").Response>}
 */
export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (refreshToken) {
    const payload = jwt.decode(refreshToken);
    if (payload && typeof payload !== "string" && typeof payload.id === "string") {
      const user = await findUserByIdWithRefreshToken(payload.id);
      if (user?.refreshToken === refreshToken) await clearRefreshToken(user._id);
    }
  }
  res.clearCookie("refreshToken", clearCookieOptions);
  return sendSuccess(res, 200, "Logged out successfully", {});
});

/**
 * Return the authenticated account's public profile.
 * @param {import("express").Request} req Authenticated request.
 * @param {import("express").Response} res Express response.
 * @returns {Promise<import("express").Response>}
 */
export const me = asyncHandler(async (req, res) => {
  return sendSuccess(res, 200, "Account retrieved successfully", { user: toPublicUser(req.user) });
});
