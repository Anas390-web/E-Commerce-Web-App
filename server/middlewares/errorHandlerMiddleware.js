export default function errorHandlerMiddleware(err, req, res, next) {
   return res.status(500).json({success: false, msg: 'Something went wrong'});
}