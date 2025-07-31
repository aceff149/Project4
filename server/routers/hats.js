import express from "express";
import db from "../dbConnection.js";

const hatsRouter = express.Router();

// GET all hats: http://localhost:4000/hats/
Router.get ('/',async (req,res)=> {
  console.log ("asdasdasdsa")
  try {
    const [result] = await db.query("SELECT * FROM Hats")
    res.status(200).json(result)
  } catch (err) {
    console.log("Error retrieving Hats:", err);
    res.status(500).send("Server error while retrieving hats");
  }
})
export default hatsRouter;