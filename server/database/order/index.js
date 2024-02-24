import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    orderDetails: [
      {
        food: { type: mongoose.Types.ObjectId, ref: "Foods" },
        quantity: { type: Number, required: true },//Number is also a validation , if a string comes it can crashes our server
        payMode: { type: String, required:true },
        status: { type: String, default: "Placed" },
        paymentDetails: {
          itemTotal: { type: Number, required: true }, //store current price of the food in the database
          promo: { type: Number, required: true }, //promo is storing amount of discount coupon (1000 - *400*=600)
          tax: { type: Number, required: true },
        },
      },
    ],
    orderRatings: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const OrderModel = mongoose.model("Orders", OrderSchema);
