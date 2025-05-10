import express from "express";
import {
  login,
  register,
  getUserIdByEmail,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.get("/getUserIdByEmail/:email", getUserIdByEmail);
router.post("/login", login);

export default router;
