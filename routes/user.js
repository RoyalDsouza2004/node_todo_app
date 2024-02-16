import express from "express";
import { getMyProfile, registers, login, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", registers);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me",isAuthenticated, getMyProfile);

export default router;