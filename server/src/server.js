import app from "./app.js";
import { connectDatabase } from "./config/db.js";
import { config } from "./config/env.js";

try {
  await connectDatabase();
  app.listen(config.port, () => {
    console.log(`Downbot API listening on port ${config.port}`);
  });
} catch (error) {
  console.error("Unable to start Downbot API:", error);
  process.exitCode = 1;
}
