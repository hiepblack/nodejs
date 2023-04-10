import mongoose from "mongoose";

const orderdetailSchema = mongoose.Schema(
  {
    list: [
      {
        name: {
          type: String,
          require: true,
        },
        price: {
          type: String,
          require: true,
        },
        quantity: {
          type: Number,
          require: true,
        },
        image: String,
        idProduct: String,
        totalPrice:Number
      },
    ],
    totalMoney: {
      type: Number,
      require: true,
    },
    totalQuantity: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("orderdetails", orderdetailSchema);