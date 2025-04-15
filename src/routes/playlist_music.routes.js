import express from "express";
import playlist_musicController from "../controllers/playlist_music.controller.js";

const router = express.Router();

router.post("/", playlist_musicController.createplaylist_music);
router.get("/", playlist_musicController.getallplaylist_music);
router.get("/:id", playlist_musicController.getplaylist_musicbyid);
router.put("/:id", playlist_musicController.updateplaylist_music);
router.delete("/:id", playlist_musicController.deleteplaylist_music);

export default router;
