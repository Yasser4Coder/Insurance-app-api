import { getIO } from "../config/socket.js"; // Adjust path if needed

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
      message: `Notification sent to user ${fullName}`,
      timestamp,
    });
  } catch (err) {
    console.error("Error sending notification to user:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { sendNotificationToAll, sendNotificationToUser };
