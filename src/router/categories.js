import express from 'express';
import {create,getall,getone} from "../Controller/cateController.js"
import {verifyToken} from "../middlewares/verifyToken.js"


const router = express.Router();

router.get("/categories/",getall);
router.get("/category/:id",getone);
router.post("/categories",create);


export default router;