"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorbuilder = exports.UnauthorizedError = exports.TooManyRequestsError = exports.TokenRequiredError = exports.NotFoundError = exports.InternalServerError = exports.ForbiddenError = exports.ConflictError = exports.BadRequestError = void 0;
var errorbuilder = exports.errorbuilder = function errorbuilder(statuscode, message) {
  var error = new Error(message);
  error.statuscode = statuscode;
  error.name = "appError";
  return error;
};
var NotFoundError = exports.NotFoundError = function NotFoundError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "resource not found";
  return errorbuilder(404, message);
};
var TokenRequiredError = exports.TokenRequiredError = function TokenRequiredError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Refresh token required";
  return errorbuilder(404, message);
};
var ForbiddenError = exports.ForbiddenError = function ForbiddenError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Forbidden";
  return errorbuilder(403, message);
};
var UnauthorizedError = exports.UnauthorizedError = function UnauthorizedError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Unauthorized";
  return errorbuilder(401, message);
};
var BadRequestError = exports.BadRequestError = function BadRequestError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Bad request";
  return errorbuilder(400, message);
};
var ConflictError = exports.ConflictError = function ConflictError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Conflict";
  return errorbuilder(409, message);
};
var TooManyRequestsError = exports.TooManyRequestsError = function TooManyRequestsError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Too many requests";
  return errorbuilder(429, message);
};
var InternalServerError = exports.InternalServerError = function InternalServerError() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Internal server error";
  return errorbuilder(500, message);
};