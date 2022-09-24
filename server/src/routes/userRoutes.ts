import express from "express";
import { getUsers, updatePassword, updateUser, deleteUser } from "../controllers/userController";
import { sessionTokenAdmin, sessionTokenUser } from "../middleware/auth";

const router = express.Router();

router.get("/get", sessionTokenAdmin, getUsers);
router.put("/update", sessionTokenUser, updateUser);
router.put("/updatePassword", sessionTokenUser, updatePassword);
router.delete("/delete/:email", sessionTokenUser, deleteUser);

export default router;