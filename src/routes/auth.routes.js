import { Router } from "express"
import * as userController from '../controllers/user.controller.js'

const authRouter = Router()

authRouter.post('/signup', userController.signUp)


export {authRouter}