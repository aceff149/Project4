import express from "express";
import db from "../dbConnection.js";

const userRouter = express.Router();

// POST /api/users/login — authenticate user
userRouter.post("/", async (req, res) => {
  const { user_name, user_password } = req.body;

  if (!user_name || !user_password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE user_name = ? AND user_password = ?",
      [user_name, user_password]
    );

    if (rows.length > 0) {
      res.json(rows[0]); // Login success
    } else {
      res.status(404).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    console.error("Error in fetching user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.post("/register", async (req, res) => {
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
    res.status(500).json({ error: "Failed to register user" });
  }
});

export default userRouter;
