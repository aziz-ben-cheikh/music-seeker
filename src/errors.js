export const errorbuilder = (statuscode, message) => {
  const error = new Error(message);
  error.statuscode = statuscode;
  error.name = "appError";
  return error;
};

export const NotFoundError = (message = "resource not found") => {
  return errorbuilder(404, message);
};

export const TokenRequiredError = (message ="Refresh token required") =>{
  return errorbuilder(404, message)
}

export const ForbiddenError = (message = "Forbidden") => {
  return errorbuilder(403, message);
};

export const UnauthorizedError = (message = "Unauthorized") => {
  return errorbuilder(401, message);
};

export const BadRequestError = (message = "Bad request") => {
  return errorbuilder(400, message);
};

export const ConflictError = (message = "Conflict") => {
  return errorbuilder(409, message);
};

export const TooManyRequestsError = (message = "Too many requests") => {
  return errorbuilder(429, message);
};

export const InternalServerError = (message = "Internal server error") => {
  return errorbuilder(500, message);
};
