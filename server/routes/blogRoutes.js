import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { viewBlog, viewLatestBlogs } from "../controllers/blogController.js";
export const router = express.Router();

router.get("/tenLatestBlogs", viewLatestBlogs);
router.get("/:blogId", isAuthenticated, viewBlog);
