import express from 'express'
import { signUpUser, login } from '../controllers/auth.js';
const authRouter = express.Router();

authRouter.route('/register').post(signUpUser)
authRouter.route('/login').post(login)

export default authRouter