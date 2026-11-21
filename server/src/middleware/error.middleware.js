import mongoose from "mongoose";
import { AppError } from "../utils/AppError.js";
import { config } from "../config/env.js";

/**
 * Convert operational and database errors into the standard failure envelope.
 * @param {Error & Record<string, any>} error Reported error.
 * @param {import("express").Request} req Express request.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Next middleware callback.
 * @returns {import("express").Response}
 */
export function errorHandler(error, req, res, next) {
  let statusCode = 500;
  let message = "Internal server error";
  let errors = [];

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errors = error.errors;
  } else if (error?.code === 11000) {
    statusCode = 409;
    message = "An account with this value already exists";
    const field = Object.keys(error.keyValue ?? {})[0] ?? "email";
    errors = [{ field, message: `${field} is already in use` }];
  } else if (error instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid request";
    errors = [{ field: error.path, message: "Invalid value" }];
  } else if (error?.name === "JsonWebTokenError" || error?.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Unauthorized";
  } else {
    console.error(error);
  }

  const response = { success: false, message, errors };
  if (config.nodeEnv !== "production" && statusCode === 500) response.stack = error?.stack;
  return res.status(statusCode).json(response);
}
