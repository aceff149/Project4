import express from "express";
import db from "../dbConnection.js";

const userRouter = express.Router();

// ❗ REMOVE this duplicate route if it's already in `./routers/users.js`
userRouter.post("/register/", async (req, res) => {

  const { user_name, user_password } = req.body;

  if (!user_name || !user_password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  console.log ("1")
  try {
    console.log ("2")
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

userRouter.post("/", async (req, res) => {

  const { user_name, user_password } = req.body;
console.log (user_name, user_password)
  if (!user_name || !user_password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    console.log ("2")
    const [result] = await db.execute(
      "SELECT * FROM users WHERE user_name = ? AND user_password = ?",
      [user_name, user_password]
    );
    console.log (result)
    console.log (result[0].user_name)
    res.status(201).json({ success: true, user_name: result[0].user_name });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default userRouter;

