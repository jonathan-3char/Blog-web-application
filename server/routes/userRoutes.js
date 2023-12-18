import express from "express";
import { displayName, noSession } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

export const router = express.Router();

router.get("/displayName", isAuthenticated, displayName);
router.get("/displayName", noSession);
