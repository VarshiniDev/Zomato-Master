//const express = require("express"); //like import statement
//normally Babel converts/convert import(ES6) into required, but for nodejs we have to setup Babel
import express from "express";//ES6 feature "import"

//setup cors and helmet
import cors from "cors";
import helmet from "helmet";

const zomato=express();

//application middleware
zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(helmet());
zomato.use(cors());

//Testing route
zomato.get("/",(req,res)=>res.json({message:"Setup Success"}));

//Listen to the port
zomato.listen(4000, () => console.log("Server is running 🚀"));
