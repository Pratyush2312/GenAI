/**
 * Wrap an async Express handler and forward rejected promises to error middleware.
 * @param {import("express").RequestHandler} handler Async route handler.
 * @returns {import("express").RequestHandler}
 */
export const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};
