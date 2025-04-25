"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _music_genreController = _interopRequireDefault(require("../controllers/music_genre.controller.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/", _music_genreController["default"].createmusic_genre);
router.get("/", _music_genreController["default"].getallmusic_genre);
router.get("/:id", _music_genreController["default"].getmusic_genrebyid);
router.put("/:id", _music_genreController["default"].updatemusic_genre);
router["delete"]("/:id", _music_genreController["default"].deletemusic_genre);
var _default = exports["default"] = router;