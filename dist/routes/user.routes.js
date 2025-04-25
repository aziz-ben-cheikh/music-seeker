"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controllers/user.controller.js"));
var _auth = require("../auth.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/login", _userController["default"].login.bind(_userController["default"]));
router.post("/refresh-token", _userController["default"].refreshAccessToken.bind(_userController["default"]));
router.post("/", _auth.authenticateToken, (0, _auth.authorizePermission)("create_users"), _userController["default"].createuser);
router.get("/", _auth.authenticateToken, (0, _auth.authorizePermission)("read_users"), _userController["default"].getalluser);
router.get("/:id", _auth.authenticateToken, (0, _auth.authorizePermission)("read_users"), _userController["default"].getuserbyid);
router.put("/:id", _auth.authenticateToken, (0, _auth.authorizePermission)("update_users"), _userController["default"].updateuser);
router["delete"]("/:id", _auth.authenticateToken, (0, _auth.authorizePermission)("delete_users"), _userController["default"].deleteuser);
var _default = exports["default"] = router;