import express from "express";
import { getIO } from "../config/socket.js"; // Adjust path if needed

const router = express.Router();

router.post("/", async (req, res) => {
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
    console.error("Error forwarding to Render:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
