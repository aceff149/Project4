import express from 'express'
import db from '../dbConnection.js'
const Router = express.Router()

Router.post ("/", async(req, res)=> {
  console.log ("Login Router ...")
  const { userName, password } = req.body
  try {
    const [rows] = await db.query ("SELECT * from users WHERE userName = ? AND password = ? ", [userName, password])
    if (rows.length == 0)
      res.status(404).send("User not found")
    else
      res.status(200).send("Login successful")
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Server error while logging in");
  }
})

Router.post ("/register/", async(req, res)=> {
  console.log ("Router, register user ...")
  const {userName, password} = req.body
  try {
    const [result] = await db.query ("INSERT INTO users (userName, password) VALUES (?, ?)", [userName, password]) 
    res.status(201).send("Student added successfully");
  } catch (error) {
    console.error("Register user error:", error);
    res.status(500).send("Server error while adding user");
  }
})

export default Router;