import express from "express";
import playlistController from "../controllers/playlist.controller.js";

const router = express.Router();

router.post("/", playlistController.createplaylist);
router.get("/", playlistController.getallplaylist);
router.get("/:id", playlistController.getplaylistbyid);
router.put("/:id", playlistController.updateplaylist);
router.delete("/:id", playlistController.deleteplaylist);

export default router;
