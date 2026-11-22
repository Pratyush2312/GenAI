import "dotenv/config";

const required = (key) => {
  const value = process.env[key]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
};

const accessTokenSecret = required("ACCESS_TOKEN_SECRET");
const refreshTokenSecret = required("REFRESH_TOKEN_SECRET");

if (accessTokenSecret.length < 32 || refreshTokenSecret.length < 32) {
  throw new Error("JWT secrets must be at least 32 characters long");
}
if (accessTokenSecret === refreshTokenSecret) {
  throw new Error("Access and refresh token secrets must be different");
}

const nodeEnv = process.env.NODE_ENV ?? "development";
if (!["development", "production", "test"].includes(nodeEnv)) {
  throw new Error("NODE_ENV must be development, production, or test");
}

const port = Number(process.env.PORT ?? 5000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

/** Validated runtime configuration shared by the backend. */
export const config = Object.freeze({
  port,
  nodeEnv,
  mongoUri: required("MONGODB_URI"),
  accessTokenSecret,
  refreshTokenSecret,
  GROQ_API_KEY:required("GROQ_API_KEY")
});
