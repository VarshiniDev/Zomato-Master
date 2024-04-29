//Library
import express from "express";
import passport from "passport";
import AWS from "aws-sdk";
import multer from "multer"; //gets img from user and stores it in ram till it is uploaded

//Models
import { ImageModel } from "../../database/user"; //{} destructuring it bcoz we are just exporting it but not doing export default there

//Utilities
import {s3Upload} from "../../Utils/AWS/s3";
 
//setup router
const Router = express.Router();

//configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

//AWS s3 bucket config
const s3Bucket=new AWS.S3({
  accessKeyId:process.env.AWS_S3_ACCESS_KEY,
  secretAccessKey:process.env.AWS_S3_SECRET_KEY,
  region:"ap-south-1",//ap-asia pacific
});

/*
Route    /
Des      Uploads given image to s33 bucket , and saves file link to mongodb
Params   id
Access   Public
Method   POST
*/
Router.post("/", upload.single("file"), async (req, res) => {
  // req provides a property called file
  try {
    const file = req.file;//storing it  or getting it in our ram
    // get bucket name
    //s3 bucket options
    const bucketOptions = {
      Bucket: "shapeaizomatoclone",
      Key: file.originalname,// used along with the file name 
      Body: file.buffer, //image in ram, under memory
      ContentType: file.mimetype,//what type of content that we need to send
      ACL: "public-read", //access control list
    };

    //something that uploads it to the aws server
    const uploadImage = await s3Upload(bucketOptions); //returns url of image
    return res.status(200).json({ uploadImage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
