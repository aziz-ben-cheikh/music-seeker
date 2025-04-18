 import express from "express";
import userController from"../controllers/user.controller.js";
 
 const router = express.Router();
 
 router.post("/login", userController.login.bind(userController));
 router.post("/", userController.createuser);
 router.get("/", userController.getalluser);
 router.get("/:id", userController.getuserbyid);
 router.put("/:id", userController.updateuser);
 router.delete("/:id", userController.deleteuser);

 export default router;
 