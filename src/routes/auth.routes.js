import { Router } from "express"
import * as userController from '../controllers/user.controller.js'
import { auth } from './../middlewares/auth.middleware.js';

export const authRouter = Router()

authRouter.post('/signup', userController.signUp);
authRouter.post('/login', userController.login);
authRouter.get('/refresh-token', userController.refreshAccessToken);
authRouter.get('/logout', userController.logout);
authRouter.get('/verify/:token', userController.verifyEmail);
authRouter.get('/profile',auth, userController.getProfile);
