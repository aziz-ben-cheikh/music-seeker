import express, { Router } from "express";
import followController from"../controllers/follow.controller.js";

const router = express.Router();

router.post("/", followController.createfollow);
router.get("/", followController.getallfollow);
router.get("/:id", followController.getfollowbyid);
router.put("/:id", followController.updatefollow);
router.delete("/:id", followController.deletefollow);
export default router;
