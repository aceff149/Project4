import express from "express";
import cors from "cors";
import userRouter from "./routers/users.js";
import questionRouter from "./routers/questions.js";
import answerRouter from "./routers/answer.js";
import db from "./dbConnection.js";
// import dotenv from "dotenv";
// dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the QAnswer Forum API!");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
