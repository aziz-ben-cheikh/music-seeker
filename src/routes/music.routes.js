import express from "express";
import musicController from "../controllers/music.controller.js";

const router = express.Router();

router.post("/", musicController.createmusic);
router.get("/", musicController.getallmusic);
router.get("/:id", musicController.getmusicbyid);
router.put("/:id", musicController.updatemusic);
router.delete("/:id", musicController.deletemusic);

export default router;
