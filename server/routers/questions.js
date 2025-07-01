import express from 'express'
import db from '../dbConnection.js'
const Router = express.Router()


Router.get ("/:categoryID", async(req, res)=> {
  console.log ("Question Router, List Questions by categoryID ...")
  try {
    const categoryID = req.params.categoryID
    const response = await db.query ("SELECT * from questions WHERE category_id = ?", [categoryID] )
    console.log (response[0])
    res.status(200).send(response[0]);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Server error while logging in");
  }
})

export default Router;