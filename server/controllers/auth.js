import { StatusCodes } from 'http-status-codes'
import User from '../models/User.js';

const signUpUser = async (req, res) => {
   // USER CREDENTIALS EXTRACTION:
   const { username, email, password } = req.body;
   // THROW ERROR IF THEY DON'T EXIST:
   if (!username || !email || !password) {
      return res.status(StatusCodes.BAD_GATEWAY).json({
         msg: 'Please provide credentials'
      })
   }
   // SAVE THE CREDENTIALS IN DB:
   const user = await User.create({ ...req.body });
   // CREATE A TOKEN FOR THE USER:
   const token = user.createJwt();
   // RESPOND TO USER WITH TOKEN AND USERNAME:
   res.status(StatusCodes.CREATED).json({
      username: user.username,
      token
   })
}

const login = async (req, res) => {
   // USER LOGIN CREDENTIALS EXTRACTION:
   const { email, password } = req.body;
   // THROW AN ERROR IF CREDENTIALS DON'T EXIST:
   if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
         msg: 'Please provide email and password'
      })
   }
   // CHECK IF THEY EXIST IN THE DATABASE:
   const user = await User.findOne({ email })
   // THROW AN ERROR IF USER DOES NOT EXIST:
   if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
         msg: 'User does not exist'
      })
   }
   // COMPARE PASSWORDS:
   const isPasswordCorrect = await user.comparePassword(password);
   // THROW AN ERROR IF PASSWORD IS NOT CORRECT/MATCHED:
   if (!isPasswordCorrect) {
      return res.status(StatusCodes.NOT_FOUND).json({
         msg: 'Password is not correct'
      })
   }
   // CREATION OF TOKEN:
   const token = user.createJwt();
   // RESPONDING WITH TOKEN AND USERNAME:
   res.status(StatusCodes.OK).json({ username: user.username, token })
}

export { signUpUser, login }