class CustomApiError extends Error {
   constructor(message, statusCode) {
      super(message),
      this.statusCode = statusCode
   }
}

class BadRequestError extends CustomApiError {
   constructor(message, statusCode) {
      super(message),
      this.statusCode = 400
   }
}

class UnauthenticatedError extends CustomApiError {
   constructor(message, statusCode) {
      super(message),
      this.statusCode = 401
   }
}


export { CustomApiError, BadRequestError, UnauthenticatedError }