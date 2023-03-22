import express from 'express';
import {create,getall,remove,update,getOne} from "../Controller/productController.js"


const router = express.Router();

router.get("/product/",getall);
router.get("/product/:id",getOne);
router.post("/product",create);
router.put("/product/:id",update);
router.delete("/product/:id",remove);

export default router;
