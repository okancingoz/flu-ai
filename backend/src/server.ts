import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config/db";
import { connectRedis } from "./config/redisClient";

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1); // Exit the process with failure
  }
})();
