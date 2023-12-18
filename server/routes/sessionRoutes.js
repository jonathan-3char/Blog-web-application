import express from "express";
import { login, signUp } from "../controllers/sessionController.js";

export const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
