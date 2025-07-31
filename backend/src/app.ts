import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";

import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import dictionaryRoutes from "./routes/dictionary.routes";
import promptRoutes from "./routes/prompt.routes";
import userRoutes from "./routes/user.routes";
import wordRoutes from "./routes/word.routes";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
  })
);

app.use(mongoSanitize());

app.use(hpp());

app.use(express.json());

// Route'lar
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/prompts", promptRoutes);
app.use("/api/v1/dictionary", dictionaryRoutes);
app.use("/api/v1/words", wordRoutes);

app.get("/", (req, res) => {
  res.send("Fluai Backend is running.");
});

app.use(errorHandler);

export default app;
