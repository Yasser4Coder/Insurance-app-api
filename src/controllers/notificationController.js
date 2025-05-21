import { getIO } from "../config/socket.js"; // Adjust path if needed
import Policy from "../models/Policy.js";
import {format} from "date-fns";

/**
 * Send notification to all connected users
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const sendNotificationToAll = async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "A non-empty message is required." });
  }

  try {
    const io = getIO(); // Get io instance

    if (!io) {
      return res.status(500).json({ error: "Socket.io is not initialized" });
    }

    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    io.emit("notification", { message, timestamp });

    res.json({
      success: true,
      message: "Notification sent to all users",
      timestamp,
    });
  } catch (err) {
    console.error("Error sending notification:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Send notification to a specific user by userId
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const sendNotificationToUser = async (req, res) => {
  const { userId } = req.params;
  const { message } = req.body;

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "Valid userId is required." });
  }

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "A non-empty message is required." });
  }

  try {
    const io = getIO(); // Get io instance

    if (!io) {
      return res.status(500).json({ error: "Socket.io is not initialized" });
    }

    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Send to specific user by using their socket id
    // This assumes you've stored user-to-socket mappings
    const userSockets = Object.values(io.sockets.sockets).filter(
      (socket) => socket.userId === userId
    );

    if (userSockets.length === 0) {
      return res.status(404).json({ error: "User not connected" });
    }

    userSockets.forEach((socket) => {
      socket.emit("notification", { message, timestamp });
    });

    res.json({
      success: true,
      message: `Notification sent to user ${userId}`,
      timestamp,
    });
  } catch (err) {
    console.error("Error sending notification to user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Automatically send notifications for expired policies
 */
const sendExpiredPolicyNotifications = async () => {
  try {
    const io = getIO();
    if (!io) {
      console.error("Socket.io is not initialized");
      return;
    }

    const now = new Date();

    // Find policies that expired today or earlier and are not yet notified
    const expiredPolicies = await Policy.find({
      expiryDate: { $lte: now },
      notified: false, // You need this field in your Policy model
    });
    
    const policies = await Policy.find({ userId });
    const expiredPolicy = [];

    for (const policy of policies) {

      if (policy.status === "expired") {
        expiredPolicy.push(policy._id);
      }
    }

    for (const policy of expiredPolicy) {
      const { userId } = policy;

      const timestamp = format(new Date(), "hh:mm a"); // Optional formatting

      const userSockets = Object.values(io.sockets.sockets).filter(
        (socket) => socket.userId === userId
      );

      if (userSockets.length > 0 && expiredPolicy.length > 0) {
        userSockets.forEach((socket) => {
          socket.emit("notification", {
            message: `Your policy has expired. Please renew it.`,
            timestamp,
          });
        });
      }

      // Mark the policy as notified to prevent duplicate notifications
      policy.notified = true;
      await policy.save();

      if(policy.status === "paid"){
        policy.notified = false;
      }
    }
  } catch (err) {
    console.error("Error sending expired policy notifications:", err);
  }
};

export { sendNotificationToAll, sendNotificationToUser, sendExpiredPolicyNotifications };
