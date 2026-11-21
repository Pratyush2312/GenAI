/**
 * Send the standard success response envelope.
 * @param {import("express").Response} res Express response.
 * @param {number} statusCode HTTP status code.
 * @param {string} message Public success message.
 * @param {unknown} data Response payload.
 * @returns {import("express").Response}
 */
export function sendSuccess(res, statusCode, message, data) {
  return res.status(statusCode).json({ success: true, message, data });
}
