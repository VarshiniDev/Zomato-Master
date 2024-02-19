//const express = require("express"); //like import statement
//normally Babel converts/convert import(ES6) into required, but for nodejs we have to setup Babel
import express from "express";//ES6 feature "import"

const zomato=express();

//Testing route
zomato.get("/",(req,res)=>res.json({message:"Setup Success"}));

//Listen to the port
zomato.listen(4000, () => console.log("Server is running 🚀"));
