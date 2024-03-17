//Library
import express from "express";
import passport from "passport";
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
    const file = req.file;
    // get bucket name
    //s3 bucket options
    const bucketOptions = {
      Bucket: "//bucket name",
      Key: file.originalname,
      Body: file.buffer, //image in ram
      ContentType: file.mimetype,
      ACL: "public-read", //access control list
    };
    
    const uploadImage = await s3Upload(bucketOptions); //returns url of image
    return res.status(200).json({ uploadImage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
