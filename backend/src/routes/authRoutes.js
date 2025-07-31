import { Router } from "express";
import {
  register,
  login,
  logout,
  verify2FA,
  authStatus,
  setup2FA,
  Reset2FA,
} from "../controllers/authController.js";
import passport from "passport";

const router = Router();

// Registration Route
router.post("/register", register);

// Login Route
router.post("/login", passport.authenticate("local"), login);

// Auth Status Route
router.get("/status", authStatus);

// Logout Route
router.post("/logout", logout);

// 2FA Setup Route (use controller, not inline!)
router.post("/2fa/setup", setup2FA);

// 2FA Verify Route
router.post("/2fa/verify", verify2FA);

// 2FA Reset Route
router.post("/2fa/reset", Reset2FA);

export default router;
