import { CustomApiError, BadRequestError, UnauthenticatedError } from '../errors/custom-errors.js'
import { StatusCodes } from 'http-status-codes'

export default function errorHandlerMiddleware(err, req, res, next) {
   const customErrorObject = {
      // Default error settings
      message: err.message || 'Something went wrong, Please try again later',
      statusCode: err.statusCode || 500
   }

   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: err.message,
      err
   })

}