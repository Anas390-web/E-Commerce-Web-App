import express from 'express'
import { signUpUser, login, getUserDetails } from '../controllers/auth.js';
import authentication from '../middlewares/auth.js'
const authRouter = express.Router();

authRouter.route('/register').post(signUpUser)
authRouter.route('/login').post(login)
authRouter.route('/').get(authentication ,getUserDetails)

export default authRouter