 import express from "express";
import userController from"../controllers/user.controller.js";
import { authenticateToken,authorizePermission } from "../auth.js"; 

 const router = express.Router();
 
 router.post("/login", userController.login.bind(userController));
 router.post("/",  authenticateToken, authorizePermission("create_users"), userController.createuser);
 router.get("/", authenticateToken, authorizePermission("read_users"), userController.getalluser);
 router.get("/:id",authenticateToken, authorizePermission("read_users"), userController.getuserbyid);
 router.put("/:id",authenticateToken, authorizePermission("update_users"), userController.updateuser);
 router.delete("/:id", authenticateToken, authorizePermission("delete_users"), userController.deleteuser);

 export default router;
 