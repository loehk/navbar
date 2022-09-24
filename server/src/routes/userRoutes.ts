import express from "express";
import { getUsers, updatePassword, updateUser, deleteUser, setAdmin } from "../controllers/userController";
import { sessionTokenAdmin, sessionTokenUser } from "../middleware/auth";

const router = express.Router();

router.get("/get", sessionTokenAdmin, getUsers);
router.put("/update", sessionTokenUser, updateUser);
router.put("/updatePassword/:email/:password", sessionTokenUser, updatePassword);
router.delete("/delete/:email", sessionTokenUser, deleteUser);
router.put("/setAdmin/:email/:isAdmin", sessionTokenAdmin, setAdmin);

export default router;