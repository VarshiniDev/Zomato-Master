//Libraries
import express from "express";
import passport from "passport";

//Database modal
import { RestaurantModel } from "../../database/allModels"; //../to get outof a folder

//router setup
const Router = express.Router();

/* 
Description of the route
Route     /restaurant
Des       Get all the restaurant details based on the city
Params    none
Access    Public
Method    GET
*/
Router.get("/", async (req, res) => {
  //we use query parameter (....?key=ubhscbs)after qn mark what i have is a url query
  try {
    const { city } = req.query;
    const restaurants = await RestaurantModel.find({ city });

    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
Description of the route
Route     /restaurant
Des       Get individual restaurant details based on id
Params    id
Access    Public
Method    GET
*/
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const restaurant = await RestaurantModel.findOne(_id);
    if (!restaurant)
      return res.status(404).json({ error: "Restaurant not found" });

    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
Description of the route
Route     /search
Des       Get individual restaurant details based on search string
Params    none
Body      search string
Access    Public
Method    GET
*/
Router.get("/search", async (req, res) => {
  try {
    const { searchString } = req.body;
    //regex -> it has patterns like /*A-Z*/ , this is the language that compiler understands (hey compiler match this pattern and select them)
    const restaurants = await RestaurantModel.find({
      name: { $regex: searchString, $options: "i" }, //i-> case insensitive
    }); //mongodb operator regex
    if (!restaurants)
      return res
        .status(404)
        .json({ error: `No Restaurant matched with ${searchString}` });
  } catch (error) {}
});

export default Router;
