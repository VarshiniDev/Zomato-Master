import mongoose from "mongoose";

const MenuSchema =new mongoose.Schema({
    menus :[
        {
            name :{type:String,required:true},
            items:[{
                type:mongoose.Types.ObjectId,
                ref:"Foods",
            }],//item contains food
        }
    ],
    recommended:[{
        type:mongoose.Types.ObjectId,
        ref:"Foods",
        unique:true,
    },],//array bcoz multiple recommendation
},
{
    timestamps:true,
}
    
);

export const MenuModel=mongoose.model("Menu",MenuSchema);