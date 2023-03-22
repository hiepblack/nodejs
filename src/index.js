import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRouter from "./router/product.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/", productRouter);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}
export const viteNodeApp = app;
