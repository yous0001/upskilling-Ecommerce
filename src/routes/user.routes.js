import { Router } from "express"
import * as userController from '../controllers/user.controller.js'
import { auth } from './../middlewares/auth.middleware.js';
import { userRoles } from "../utils/user-roles.enum.js";
import { authorization } from "../middlewares/authorization.middleware.js";


const router=Router();


router.get('/:id',auth,authorization([userRoles.ADMIN]), userController.getUserById);
router.put('/:id',auth,userController.updateUserById);
router.delete('/:id',auth,userController.deleteUserById);

export default router