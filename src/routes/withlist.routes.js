import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
import * as withlistController from '../controllers/withlist.controller.js'

export const withlistRouter=Router()

withlistRouter.patch('/:id',auth,withlistController.addProductToWithList);
withlistRouter.get('/',auth,withlistController.getWithList);
withlistRouter.patch('/:id',auth,withlistController.removeProductFromWithList);