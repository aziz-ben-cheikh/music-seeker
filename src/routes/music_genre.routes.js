import express from "express";
import music_genreController from "../controllers/music_genre.controller.js";

const router = express.Router();

router.post("/", music_genreController.createmusic_genre);
router.get("/", music_genreController.getallmusic_genre);
router.get("/:id", music_genreController.getmusic_genrebyid);
router.put("/:id", music_genreController.updatemusic_genre);
router.delete("/:id", music_genreController.deletemusic_genre);

export default router;
