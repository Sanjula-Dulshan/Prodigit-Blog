import express from "express";
import {
  getAccessToken,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/login", login);
router.post("/refresh_token", getAccessToken);
router.post("/logout", logout);

export default router;
