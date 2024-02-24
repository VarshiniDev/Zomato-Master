//Library
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Models
import { UserModel } from "../../database/user"; //{} destructuring it bcoz we are just exporting it but not doing export default there

//setup router
const Router = express.Router();

/* Description of the route
Route     /signup
Des       Signup with email and password
Params    none
Access    Public
Method    Post
*/

//Signup route
Router.post("/signup", async (req, res) => {
  try {
    const { email, password, fullname, phoneNumber } = req.body.credentials;

    //check whether email exists
    const checkUserByEmail = await UserModel.findOne({ email }); //{email}=> {email:email} similar one
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    if (checkUserByEmail || checkUserByPhone) {
      return res.json({ error: "User aldready exist!" });
    }

    // hash th password (no direct storage of pw) -> once hashed then it cannot be decrypted, but you can compare it
    const bcryptSalt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    //save to DB
    await UserModel.create({
      ...req.body.credentials,
      password: hashedPassword,
    });

    //generate JWT auth token (new user)
    const token = jwt.sign({ user: { fullname, email } }, "Zomato App"); //secret key to generate token // just adding fullname and email to send to client react

    //return the JWT token
    return res.status(200).json({token , status:"Success!"});//200 ->sucsess
  } catch (error) {
    return res.status(500).json({ error: error.message }); //500 - internal server error
  }
});

export default Router;
