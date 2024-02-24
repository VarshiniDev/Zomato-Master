import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    images:[{
        location:{type:String, required:true}//for url type string
    },],//array due to multiple images

},
{
    timestamps:true,
});

export const ImageModel=mongoose.model("Images",ImageSchema);
