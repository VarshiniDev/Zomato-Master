//configuration or stratergy on how to authenticate to google and use this fn to our route
// npm i passport passport-google-oauth20 -> install this in server terminal
import googleOAuth from "passport-google-oauth20";

import { UserModel } from "../database/allModels";

const GoogleStrategy = googleOAuth.Strategy;

export default (passport) => {
  //passport is an authentication library
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/google/callback",
      }, //as we deal with database call we need an async arrow fn [as mongodb is involved we use async as promises is invloved]
      async (accessToken, refreshToken, profile, done) => {
        //access token is jwt token, profile is our own profile
        const newUser = {
          //creating new object
          fullname: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
        };
        try {
          //calling the api
          //whether user exist or not
          const user = await UserModel.findOne({ email: newUser.email });

          if (user) {
            //if user exist create a token
            const token = user.generateJwtToken();
            //return user
            done(null, { user, token });
          } else {
            //create user
            const user = await UserModel.create(newUser);
            //if user exist create a token
            const token = user.generateJwtToken();
            //return user
            done(null, { user, token });
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
  //serialize and deserialize data, as these datas will be encoded so we have to decode it
  passport.serializeUser((userData, done) => done(null, { ...userData }));
  passport.deserializeUser((id, done) => done(null, id));
};
