//Importing Env Variables
require("dotenv").config();

//Libraries
//const express = require("express"); //like import statement
//normally Babel converts/convert import(ES6) into required, but for nodejs we have to setup Babel
import express from "express"; //ES6 feature "import"
//setup cors and helmet
import cors from "cors";
import helmet from "helmet";

//microsevice route (importing micro services)
import Auth from "./API/Auth"; // no need to specify index.js it will automatically get it

//Database Connection
import ConnectDB from "./database/connection";

const zomato = express();

//application middleware
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());

//Application routes(prefixing it with auth route)
zomato.use("/auth",Auth);

//Testing route
zomato.get("/", (req, res) => res.json({ message: "Setup Success" }));

//Listen to the port
zomato.listen(4000, () =>
  ConnectDB().then(() => console.log("Server is running 🚀 and DB connected 😊"))
  .catch(()=>console.log("Server is running, but DB connection failed 😐"))
);