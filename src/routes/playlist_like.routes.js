import express from "express";
import playlist_likeController from "../controllers/playlist_like.controller.js";

const router = express.Router();

router.post("/", playlist_likeController.createplaylist_like);
router.get("/", playlist_likeController.getallplaylist_like);
router.get("/:id", playlist_likeController.getplaylist_likebyid);
router.put("/:id", playlist_likeController.updateplaylist_like);
router.delete("/:id", playlist_likeController.deleteplaylist_like);

export default router;
