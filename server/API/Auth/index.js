//Library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";


//Models
import { UserModel } from "../../database/user"; //{} destructuring it bcoz we are just exporting it but not doing export default there

//setup router
const Router = express.Router();

/* 
Description of the route
Route     /signup
Des       Register new user
Params    none
Access    Public
Method    Post
*/

//Signup route
Router.post("/signup", async (req, res) => {
  try {
    await UserModel.findByEmailAndPhone(req.body.credentials); //connected static fn in Auth index.js

    // hash the password (no direct storage of pw) -> once hashed then it cannot be decrypted, but you can compare it
    //const bcryptSalt = await bcrypt.genSalt(8);
    //const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    //save to DB
    const newUser = await UserModel.create(req.body.credentials);

    //generate JWT auth token (new user)
    const token = newUser.generateJwtToken(); //jwt.sign({ user: { fullname, email } }, "ZomatoAPP"); //secret key to generate token // just adding fullname and email to send to client react

    //return the JWT token
    return res.status(200).json({ token, status: "Success!" }); //200 ->success
  } catch (error) {
    return res.status(500).json({ error: error.message }); //500 - internal server error
  }
});

/* 
Description of the route
Route     /signin
Des       Signup with email and password
Params    none
Access    Public
Method    Post
*/

//signin route
Router.post("/signin", async (req, res) => {
  try {
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();
    return res.status(200).json({ token, status: "Success!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/* 
Description of the route
Route     /google
Des       Google Signin
Params    none
Access    Public
Method    Post
*/
Router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      //scope is permission of what exactly we need from google
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

/* 
Description of the route (what happens after authentication)
Route     /google/callback
Des       Google Signin Callback
Params    none
Access    Public
Method    Post
*/
Router.get(
  "/google/callback",
  passport.authenticate("google", {failureRedirect: "/" }),
  (req, res) => {
    return res.json({ token: req.session.passport.user.token });//passport will set a default expiration time
  }
);

export default Router;

//use statics (UserModel.ourStatic()) and methods(checkUserByEmail.ourMethod()) in mongoose
