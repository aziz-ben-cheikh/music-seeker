import express from "express";
import genreController from "../controllers/genre.controller.js";

const router = express.Router();

router.post("/", genreController.creategenre);
router.get("/", genreController.getallgenre);
router.get("/:id", genreController.getgenrebyid);
router.put("/:id", genreController.updategenre);
router.delete("/:id", genreController.deletegenre);

export default router;
