import { Router } from "express";
import { ProductsController } from "../controller/products.controller.js";

export const router=Router();


router.post('/',ProductsController.createProduct)
router.put('/:pid',ProductsController.updateProduct)


