import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    status:Boolean,
    quality:Number,
})

export default mongoose.model('Product', productSchema);