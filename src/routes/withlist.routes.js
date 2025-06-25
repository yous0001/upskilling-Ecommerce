import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import * as withlistController from '../controllers/withlist.controller.js'

export const withlistRouter=Router()

withlistRouter.patch('/add/:id',auth,withlistController.addProductToWithList);
withlistRouter.get('/',auth,withlistController.getWithList);
withlistRouter.patch('/remove/:id',auth,withlistController.removeProductFromWithList);