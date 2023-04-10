import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import productRouter from "./router/product.js";
import authRouter from "./router/auth.js";
import cateRouter from "./router/categories.js";
import uploadImageRouter from "./router/uploadImage";
import routerOrder from "./router/order.js";
import routerOrderdetail from "./router/orderdetails.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/", productRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", cateRouter);
app.use("/api/v1", uploadImageRouter);
app.use("/api/v1/order", routerOrder);
app.use("/api/v1/orderdetail", routerOrderdetail);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}
export const viteNodeApp = app;
