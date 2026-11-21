import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

/**
 * Create a 15-minute bearer access token.
 * @param {{id: string, email: string}} user Account identity.
 * @returns {string}
 */
export function createAccessToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, config.accessTokenSecret, {
    expiresIn: "15m",
    jwtid: randomUUID()
  });
}

/**
 * Create a seven-day refresh token.
 * @param {{id: string, email: string}} user Account identity.
 * @returns {string}
 */
export function createRefreshToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, config.refreshTokenSecret, {
    expiresIn: "7d",
    jwtid: randomUUID()
  });
}
