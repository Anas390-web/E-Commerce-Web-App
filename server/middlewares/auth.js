import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

// PRODUCT APIS AUTHENTICATION FOR USERS:
const authentication = async (req, res, next) => {
   // EXTRACTION OF AUTHORIZATION HEADERS:
   const authHeader = req.headers.authorization;
   // THROW AN ERROR IF IT DOES NOT EXIST:
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
         msg: 'Unauthorized to this route'
      })
   }
   // EXTRACTION OF TOKEN FROM AUTH HEADERS:
   const token = authHeader.split(" ")[1];

   // VERIFY TOKEN:
   try {
      const payLoad = await jwt.verify(token, process.env.JWT_SECRET_KEY, {
         algorithms: ['HS256']
      });
      const { userId, username } = payLoad;
      req.user = { userId, username }
      next();
   } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).json({
         msg: 'Unauthorized to this route'
      })
   }
}

export default authentication;