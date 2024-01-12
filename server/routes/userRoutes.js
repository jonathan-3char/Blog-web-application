import express from "express";
import {
  allBlogs,
  createPost,
  displayName,
  noSession,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

export const router = express.Router();

router.get("/displayName", isAuthenticated, displayName);
router.get("/displayName", noSession);
router.post("/createPost", isAuthenticated, createPost);
router.post("/createPost", noSession);
router.get("/allBlogs", isAuthenticated, allBlogs);
router.get("/allBlogs", noSession);
