import { Router } from "express";
import * as userController from '../controllers/user.controller.js'
import { auth } from './../middlewares/auth.middleware.js';
import { userRoles } from "../utils/user-roles.enum.js";
import { authorization } from "../middlewares/authorization.middleware.js";


export const userRouter=Router();


userRouter.get('/:id',auth,authorization([userRoles.ADMIN]), userController.getUserById);
userRouter.put('/:id',auth,userController.updateUserById);
userRouter.delete('/:id',auth,userController.deleteUserById);