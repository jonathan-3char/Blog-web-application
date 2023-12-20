import express from "express";
import { login, logout, signUp } from "../controllers/sessionController.js";

export const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.get("/logout", logout);
