"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _musicController = _interopRequireDefault(require("../controllers/music.controller.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/", _musicController["default"].createmusic);
router.get("/", _musicController["default"].getallmusic);
router.get("/:id", _musicController["default"].getmusicbyid);
router.put("/:id", _musicController["default"].updatemusic);
router["delete"]("/:id", _musicController["default"].deletemusic);
var _default = exports["default"] = router;