import express from 'express';

import { generateMiddleWare } from "../middleware/loginSignup.js"
import { loginSchema, registerSchema } from "../middleware/validations/loginSignup.js"

import { authRegister, authLogin } from "../controllers/auth.js"


const authRouter = express.Router();


authRouter.post("/register", generateMiddleWare(registerSchema), authRegister)

authRouter.post("/login", generateMiddleWare(loginSchema), authLogin)

export default authRouter;
