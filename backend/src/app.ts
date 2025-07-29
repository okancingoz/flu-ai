import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/auth.routes";
import promptRoutes from "./routes/prompt.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/prompts", promptRoutes);

app.get("/", (req, res) => {
  res.send("Fluai Backend is running.");
});

app.use(errorHandler);

export default app;
