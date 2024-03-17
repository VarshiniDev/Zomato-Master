import AWS from "aws-sdk";
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

//configure aws s3 bucket
const s3Bucket = new AWS.S3({
    accesKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: "ap-south-1", //aws datacenter is in mumbai ......ap->asia pacific
  });

 export const s3Upload = (options) => {
    return new Promise((resolve, reject) =>
      s3Bucket.upload(options, (error, data) => {
        if (error) return reject(error);
        return resolve(data);
      })
    );
  };