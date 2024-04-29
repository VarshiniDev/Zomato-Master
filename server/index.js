/*// Importing Env Variables
require("dotenv").config();

// Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// configs
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

// microservice routes
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Image from "./API/Image";
import Order from "./API/orders";
import Reviews from "./API/reviews";
import User from "./API/User";
import Menu from "./API/menu";
import MailService from "./API/Mail";
import Payments from "./API/Payments";

// Database connection
import ConnectDB from "./database/connection";

const zomato = express();

console.log(process.env);

// application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

// passport cofiguration
googleAuthConfig(passport);
routeConfig(passport);

// Application Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/reviews", Reviews);
zomato.use("/user", User);
zomato.use("/menu", Menu);
zomato.use("/mail", MailService);
zomato.use("/payments", Payments);

zomato.get("/", (req, res) => res.json({ message: "Setup success" }));

const port = process.env.PORT || 4000;

zomato.listen(port, () =>
  ConnectDB()
    .then(() => console.log("Server is running 🚀"))
    .catch(() =>
      console.log("Server is running, but database connection failed... ")
    )
);*/
//Importing Env Variables
require("dotenv").config();

//Libraries
//const express = require("express"); //like import statement
//normally Babel converts/convert import(ES6) into required, but for nodejs we have to setup Babel
import express from "express"; //ES6 feature "import"
//setup cors and helmet
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import passport from "passport";

//microsevice route (importing micro services)
import Auth from "./API/Auth"; // no need to specify index.js it will automatically get it
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
//import Menu from "./API/Menu";
import Image from "./API/Image";
import Order from "./API/orders";
import Reviews from "./API/reviews";
//import Menu from "./API/menu";
import MailService from "./API/Mail";
//import Payments from "./API/Payments";

//Database Connection
import ConnectDB from "./database/connection";

//import configs
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

const zomato = express();

//application middleware
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport configuration
googleAuthConfig(passport);
routeConfig(passport);

//Application routes(prefixing it with auth route)
zomato.use("/auth", Auth);
zomato.use("/restaurant",Restaurant);
zomato.use("/food",Food);
//zomato.use("/menu",Menu);
zomato.use("/image",Image);
zomato.use("/order",Order);
zomato.use("/freviews",Reviews);
//zomato.use("/menu", Menu);
zomato.use("/mail", MailService);
//zomato.use("/payments", Payments);

//Testing route
zomato.get("/", (req, res) => res.json({ message: "Setup Success" }));

//logging the client id where i get that id in terminal (eg for us we get :750776168789-9dav69kavct3hk7qg89r04hqblfm9c07.apps.googleusercontent.com)
console.log(process.env.GOOGLE_CLIENT_ID);

//Listen to the port
zomato.listen(4000, () =>
  ConnectDB()
    .then(() => console.log("Server is running 🚀 and DB connected"))
    .catch(() => console.log("Server is running but DB connection failed 😐"))
);
