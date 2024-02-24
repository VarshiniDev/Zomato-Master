import mongoose from "mongoose";

//mongoose connection
export default async () => {
  return mongoose.connect(process.env.MONGO_URL );
};
