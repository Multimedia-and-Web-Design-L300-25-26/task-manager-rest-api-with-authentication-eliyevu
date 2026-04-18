import express from "express";
import { login, register } from "../controllers/authController.js";

const authRoutes = express.Router();

// POST /api/auth/register
authRoutes.post("/register", register);
// POST /api/auth/login
authRoutes.post("/login", login);

export default authRoutes;