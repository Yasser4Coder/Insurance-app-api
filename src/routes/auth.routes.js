import express from "express";
import {
  login,
  register,
  getUserIdByEmail,
  handleRefreshToken,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.get("/getUserIdByEmail/:email", getUserIdByEmail);
router.post("/login", login);
router.get("/", handleRefreshToken); // This is the route for refreshing the token

export default router;
