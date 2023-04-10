import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    brand: String,
    image: [String],
    description: String,
    status: {
      type: Boolean,
      default: true,
    },
    quality: Number,
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
