"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _playlist_likeController = _interopRequireDefault(require("../controllers/playlist_like.controller.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/", _playlist_likeController["default"].createplaylist_like);
router.get("/", _playlist_likeController["default"].getallplaylist_like);
router.get("/:id", _playlist_likeController["default"].getplaylist_likebyid);
router.put("/:id", _playlist_likeController["default"].updateplaylist_like);
router["delete"]("/:id", _playlist_likeController["default"].deleteplaylist_like);
var _default = exports["default"] = router;