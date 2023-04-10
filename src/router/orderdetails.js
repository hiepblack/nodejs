import express from "express";
import { createDetail, getAll} from "../Controller/orderdetail.js";

const router = express.Router();

router.get("/", getAll);
router.post("/", createDetail);

export default router;