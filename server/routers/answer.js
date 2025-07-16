import express from "express";
import cors from "cors";
// import dotenv from "dotenv"; // Uncomment if using .env
import userRouter from "./routers/users.js";
import questionRouter from "./routers/questions.js";
import answerRouter from "./routers/answer.js";
import db from "./dbConnection.js";

// dotenv.config(); // Uncomment if you use a .env file

const app = express();

app.use(cors());
app.use(express.json());

// Register routers
app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to the QAnswer Forum API!");
});

// ❗ REMOVE this duplicate route if it's already in `./routers/users.js`
app.post("/api/users", async (req, res) => {
  const { user_name, user_email, user_password } = req.body;

  if (!user_name || !user_email || !user_password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)",
      [user_name, user_email, user_password]
    );

    res.status(201).json({ success: true, userId: result.insertId });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
