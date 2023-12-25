import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { viewBlog } from "../controllers/blogController.js";
export const router = express.Router();

router.get("/:blogId", isAuthenticated, viewBlog);
