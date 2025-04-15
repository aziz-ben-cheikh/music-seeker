import express from "express";
import likeController from "../controllers/like.controller.js";

const router = express.Router();

router.post("/", likeController.createlike);
router.get("/", likeController.getalllike);
router.get("/:id", likeController.getlikebyid);
router.put("/:id", likeController.updatelike);
router.delete("/:id", likeController.deletelike);

export default router;
