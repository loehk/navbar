import express from "express";
import { getUsers } from "../controllers/userController";
import { authenticateAdminActions } from "../middleware/auth";

const router = express.Router();

router.get("/get", authenticateAdminActions, getUsers);

export default router;