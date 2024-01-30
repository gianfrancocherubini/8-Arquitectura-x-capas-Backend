import { Router } from "express";
import { ProductsController } from "../controller/products.controller.js";
export const router=Router();

router.get('/', ProductsController.getProducts)
router.post('/',ProductsController.createProduct)
router.put('/:pid',ProductsController.updateProduct)
router.get('*',ProductsController.error)

