"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateToken = authenticateToken;
exports.authorizePermission = authorizePermission;
var _roles = require("./roles.js");
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var JWT_SECRET = "your_jwt_secret";
function authenticateToken(req, res, next) {
  var authHeader = req.headers["authorization"];
  var token = authHeader && authHeader.split(" ")[1];
  console.log("Auth Header:", authHeader);
  console.log("Token Extracted:", token);
  if (!token) {
    console.log("No token provided");
    return res.sendStatus(401);
  }
  _jsonwebtoken["default"].verify(token, JWT_SECRET, function (err, user) {
    if (err) {
      console.log("JWT verification failed:", err.message);
      return res.sendStatus(403);
    }
    console.log("JWT Decoded User:", user);
    req.user = user;
    next();
  });
}
function authorizePermission(requiredPermission) {
  return function (req, res, next) {
    var userRole = req.user.roles;
    var permissions = _roles.rolePermissions[userRole] || [];
    if (!permissions.includes(requiredPermission)) {
      return res.status(403).json({
        message: "Forbidden: insufficient permission"
      });
    }
    next();
  };
}