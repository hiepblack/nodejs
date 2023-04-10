import express from "express";
import {
  create,
  getAll,
} from "../Controller/orderController.js";

const router = express.Router();

router.get("/", getAll);
router.post("/", create);

export default router;