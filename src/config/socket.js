import { Server } from "socket.io";

let io = null;

/**
 * Initialize Socket.io with an HTTP server instance
 * @param {Object} server - HTTP server instance
 * @param {Object} options - Socket.io options (optional)
 * @returns {Object} Socket.io instance
 */
const setupSocket = (server, options = {}) => {
  if (io) {
    console.log("Socket.io already initialized");
    return io;
  }

  // Default options merged with provided options
  const defaultOptions = {
    cors: {
      origin: "*", // Change to your frontend domain in production
      methods: ["GET", "POST"],
      credentials: true,
    },
    ...options,
  };

  // Initialize Socket.io with the server
  io = new Server(server, defaultOptions);

  // Set up connection handler
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Store userId when user authenticates
    socket.on("authenticate", (userId) => {
      if (userId && typeof userId === "string") {
        console.log(`User ${userId} authenticated on socket ${socket.id}`);
        socket.userId = userId;
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  console.log("Socket.io initialized successfully");
  return io;
};

/**
 * Get the Socket.io instance
 * @returns {Object|null} Socket.io instance or null if not initialized
 */
const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.io not initialized. Call setupSocket(server) first."
    );
  }
  return io;
};

export { getIO, setupSocket };
