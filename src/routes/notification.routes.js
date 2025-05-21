import express from "express";
import {
  sendNotificationToAll,
  sendNotificationToUser,
  sendExpiredPolicyNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

/**
 * Send notification to all users
 * POST /notification
 * Body: { message }
 */
router.post("/", sendNotificationToAll);

/**
 * Send notification to a specific user
 * POST /notification/:userId
 * Body: { message }
 */
router.post("/user/:userId", sendNotificationToUser);

router.get("/",sendExpiredPolicyNotifications);

export default router;
