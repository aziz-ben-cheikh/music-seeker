
export const errorbuilder =(statuscode, message)=>{
    const error = new Error(message);
    error.statuscode = statuscode;
    error.name = 'appError';
    return error;
}

export const NotFoundError = (message = 'resource not found')=>{
   return errorbuilder(404,message)
}

export const ForbiddenError = (message = 'Forbidden')=>{
   return errorbuilder(403,message)
}

export const UnauthorizedError = (message = 'Unauthorized')=>{
  return  errorbuilder(401,message)
}

//error ideas ?
