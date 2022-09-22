import express from "express";
import { getUsers, updatePassword, updateUser, deleteUser } from "../controllers/userController";
import { authenticateAdminActions, authenticateUserProfileActions } from "../middleware/auth";

const router = express.Router();

router.get("/get", authenticateAdminActions, getUsers);
router.put("/update", updateUser);
router.put("/updatePassword" , updatePassword);
router.delete("/delete/:email", deleteUser);

export default router;