import mongoose from "mongoose";
import { config } from "./env.js";

/**
 * Connect to the configured MongoDB database before starting the HTTP server.
 * @returns {Promise<void>}
 * @throws {mongoose.MongooseError} When the connection cannot be established.
 */
export async function connectDatabase() {
  await mongoose.connect(config.mongoUri);
}
