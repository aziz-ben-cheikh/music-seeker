"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _playlistController = _interopRequireDefault(require("../controllers/playlist.controller.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/", _playlistController["default"].createplaylist);
router.get("/", _playlistController["default"].getallplaylist);
router.get("/:id", _playlistController["default"].getplaylistbyid);
router.put("/:id", _playlistController["default"].updateplaylist);
router["delete"]("/:id", _playlistController["default"].deleteplaylist);
var _default = exports["default"] = router;