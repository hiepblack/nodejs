import express from "express";
import {
  create,
  getall,
  remove,
  update,
  getOne,
  restore,
  getRelase
} from "../Controller/productController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/product/", getall);
router.get("/product/relase/:categoryId", getRelase);
router.get("/product/:id", getOne);
router.post("/product", verifyToken, create);
router.put("/product/:id", verifyToken, update);
router.delete("/product/:id", verifyToken, remove);
router.delete("/product/restore/:id", verifyToken, restore);

export default router;
