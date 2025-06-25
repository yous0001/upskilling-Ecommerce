import { Router } from "express";
import * as productController from "../controllers/product.controller.js"
import { auth } from "../middlewares/auth.middleware.js";


export const productRouter=Router()

productRouter.post('/',auth,productController.addProduct);
productRouter.get('/',auth,productController.getProducts);
productRouter.get('/:id',auth,productController.getProductById);
productRouter.put('/:id',auth,productController.updateProductById);
productRouter.delete('/:id',auth,productController.deleteProductById);