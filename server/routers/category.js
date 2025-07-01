import express from 'express'
import db from '../dbConnection.js'
const Router = express.Router()


Router.get ("/", async(req, res)=> {
  console.log ("Category Router, List Category ...")
  try {
    const response = await db.query ("SELECT * from categories")
    console.log (response[0])
    res.status(200).send(response[0]);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Server error while logging in");
  }
})

export default Router;