import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//scheme
const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String }, //not required field as user can sign in evan by google
    address: [{ detail: { type: String }, for:{type:String} }], //not required while sign in and array as a user can have multiple address
    phoneNumber: [{ type: Number }],
  },
  { 
    timestamps: true,
    //createdAt -> date when the user obj was create
    //UpdatedAt -> date when the user obj was recently updated at
  }
);

//create a method that will create a json token - json generate token should be global (as we use json token for so many routes)
UserSchema.methods.generateJwtToken = function(){
  return jwt.sign({user:this._id.toString() },"ZomatoAPP");//_id:mongoose obj id ......do transaction with obj id.......this refers to user obj (current obj)
};

//Static method to check email & phno //we can reduce making 2 api call by this static
UserSchema.statics.findByEmailAndPhone = async ({email,phoneNumber}) =>{
  //check whether email exists
  const checkUserByEmail = await UserModel.findOne({ email }); //{email}=> {email:email} similar one
  const checkUserByPhone = await UserModel.findOne({ phoneNumber });

  if (checkUserByEmail || checkUserByPhone) {
    throw new Error("User Aldready Exist...!!!");
  }
  return false;//as user doesn't exist
};

//static method to check by email and pw
UserSchema.statics.findByEmailAndPassword = async ({email,password}) =>{
  //check whether email exist of user
  const user = await UserModel.findOne({ email });
  if(!user) throw new Error ("User does not exist !!! ");
  
  //compare pw that is hashed
  const doesPasswordMatch = await bcrypt.compare(password, user.password);

  if(!doesPasswordMatch) throw new Error("Invalid password !!!");

  return user;
};

 //trick in mongoose 
UserSchema.pre("save",function(next){//save -> method/fn triggered while creating //we use 'this' so use fn not arrow fn
  const user=this;

  //mongoose have series of fns runned behind the scenes

  //password is modified
  if(!user.isModified("password"))return next();
  //geeraye bcrypt salt
  bcrypt.genSalt(8,(error,salt)=>{//since its a async fn it takes 8 & generates salt the (error,salt) fn will be called
    //if error occuring it returns to next fn with error
    if(error) return next(error);
    //if it is successful then rehash the pw
    bcrypt.hash(user.password,salt,(error,hash)=>{
      if(error) return next(error);
      //assigning the hashed password
      user.password=hash;
      return next();
    })
  })
});//.pre -> run a fn in certain state of mongoose transaction like pushing data to mongodb or etc 

//Convert to model
export const UserModel = mongoose.model("Users", UserSchema);//as we dont export default we have to destructure it while importing it
//inside "collection name"
