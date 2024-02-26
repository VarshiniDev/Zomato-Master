import mongoose from "mongoose";
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

//Static method to check email & phno //we can reduce making 2 api call by this static
UserSchema.statics.findByEmailAndPhone = async (email,phoneNumber) =>{
  //check whether email exists
  const checkUserByEmail = await UserModel.findOne({ email }); //{email}=> {email:email} similar one
  const checkUserByPhone = await UserModel.findOne({ phoneNumber });

  if (checkUserByEmail || checkUserByPhone) {
    throw new Error("User Aldready Exist...!!!");
  }
  return false;//as user doesn't exist
};

//Convert to model
export const UserModel = mongoose.model("Users", UserSchema);
//inside "collection name"
