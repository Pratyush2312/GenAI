import { AppError } from "../utils/AppError.js";

/**
 * Forward unmatched API requests to the centralized error handler.
 * @param {import("express").Request} req Express request.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Next middleware callback.
 * @returns {void}
 * @throws {import("../utils/AppError.js").AppError} Always forwards a 404 error.
 */
export function notFound(req, res, next) {
  next(new AppError(404, "Route not found"));
}
