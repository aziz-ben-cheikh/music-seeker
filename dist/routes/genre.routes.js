"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _genreController = _interopRequireDefault(require("../controllers/genre.controller.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post("/", _genreController["default"].creategenre);
router.get("/", _genreController["default"].getallgenre);
router.get("/:id", _genreController["default"].getgenrebyid);
router.put("/:id", _genreController["default"].updategenre);
router["delete"]("/:id", _genreController["default"].deletegenre);
var _default = exports["default"] = router;