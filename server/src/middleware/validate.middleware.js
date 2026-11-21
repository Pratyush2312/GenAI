import { validationResult } from "express-validator";
import { AppError } from "../utils/AppError.js";

/**
 * Reject requests with invalid fields using the shared field-error envelope.
 * @param {import("express").Request} req Express request.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Next middleware callback.
 * @returns {void}
 * @throws {import("../utils/AppError.js").AppError} When validation fails.
 */
export function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const fieldErrors = result.array().map((error) => ({
    field: "path" in error ? error.path : "request",
    message: error.msg
  }));
  return next(new AppError(422, "Validation failed", fieldErrors));
}

/**
 * Reject malformed login input without revealing which credential failed.
 * @param {import("express").Request} req Express request.
 * @param {import("express").Response} res Express response.
 * @param {import("express").NextFunction} next Next middleware callback.
 * @returns {void}
 * @throws {import("../utils/AppError.js").AppError} When credentials are malformed.
 */
export function validateLogin(req, res, next) {
  if (validationResult(req).isEmpty()) return next();
  return next(new AppError(401, "Invalid credentials"));
}
