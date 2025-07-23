import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.send("FluAI Backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
