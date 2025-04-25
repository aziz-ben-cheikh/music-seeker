"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _playlist_musicController = _interopRequireDefault(require("../controllers/playlist_music.controller.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/", _playlist_musicController["default"].createplaylist_music);
router.get("/", _playlist_musicController["default"].getallplaylist_music);
router.get("/:id", _playlist_musicController["default"].getplaylist_musicbyid);
router.put("/:id", _playlist_musicController["default"].updateplaylist_music);
router["delete"]("/:id", _playlist_musicController["default"].deleteplaylist_music);
var _default = exports["default"] = router;