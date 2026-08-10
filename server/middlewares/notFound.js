export default function notFound(req, res, next) {
   console.log('Resource not found');
   return res.status(404).json({success: false, msg: 'Resource not found'});
}