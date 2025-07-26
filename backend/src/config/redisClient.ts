import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

export const connectRedis = async () => {
  try {
    console.log("Trying to connect to Redis...");
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Could not connect to Redis:", err);
  }
};

export default redisClient;
