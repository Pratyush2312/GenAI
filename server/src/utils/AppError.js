/**
 * Operational HTTP error forwarded to the centralized error handler.
 * @param {number} statusCode HTTP status code.
 * @param {string} message Public error message.
 * @param {{field: string, message: string}[]} [errors] Field-level validation details.
 * @throws {never}
 */
export class AppError extends Error {
  constructor(statusCode, message, errors = []) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
  }
}
