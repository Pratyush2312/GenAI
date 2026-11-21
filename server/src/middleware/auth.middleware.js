import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { findUserById } from "../DAO/user.dao.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * Require a valid bearer access token and attach its account to the request.
 * @param {import("express").Request} req Express request.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Next middleware callback.
 * @returns {Promise<void>}
 * @throws {import("../utils/AppError.js").AppError} When authentication fails.
 */
export const requireAuth = asyncHandler(async (req, res, next) => {
  const authorization = req.get("authorization");
  if (!authorization?.startsWith("Bearer ")) throw new AppError(401, "Unauthorized");

  const payload = jwt.verify(authorization.slice(7), config.accessTokenSecret);
  if (typeof payload === "string" || typeof payload.id !== "string") throw new AppError(401, "Unauthorized");

  const user = await findUserById(payload.id);
  if (!user) throw new AppError(401, "Unauthorized");
  req.user = user;
  next();
});
