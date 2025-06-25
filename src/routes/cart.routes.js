import { Router } from "express";
import * as cartController from '../controllers/cart.controller.js'

export const cartRouter=Router()


cartRouter.post('/add/:id',cartController.addProductToCart)
cartRouter.delete('/remove/:id',cartController.removeProductFromCart)
cartRouter.get('/',cartController.getCart)
cartRouter.post('/clear',cartController.clearCart)


