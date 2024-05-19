import express from "express";
import {isAuthorized}from "../middlewares/auth.js";

import {login, logout, register} from "../controllers/userControllers.js";
// import { isAuthorized } from "../middlewares/auth.js";
const router = express.Router();
router.post("/register" ,register);
router.post("/login" ,login ,isAuthorized)
router.post("/logout" ,logout)

export default router;