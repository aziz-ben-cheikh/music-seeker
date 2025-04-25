"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _likeController = _interopRequireDefault(require("../controllers/like.controller.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/", _likeController["default"].createlike);
router.get("/", _likeController["default"].getalllike);
router.get("/:id", _likeController["default"].getlikebyid);
router.put("/:id", _likeController["default"].updatelike);
router["delete"]("/:id", _likeController["default"].deletelike);
var _default = exports["default"] = router;