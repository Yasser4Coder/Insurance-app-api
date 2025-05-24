import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { WebSocketServer } from "ws";
import http from "http";
import { sendExpiredPolicyNotifications } from "./src/controllers/notificationController.js";

import authRoutes from "./src/routes/auth.routes.js";
import vehicleRoutes from "./src/routes/vehicle.routes.js";
import claimsRoutes from "./src/routes/claim.routes.js";
import policyRoutes from "./src/routes/policy.routes.js";
import pymentRoutes from "./src/routes/pyment.routes.js"; // keep as is if your file is actually named pyment.routes.js
import userRoutes from "./src/routes/user.routes.js";
import notificationRoutes from "./src/routes/notification.routes.js";
import planRoutes from "./src/routes/plan.routes.js";
import { setupSocket } from "./src/config/socket.js";
import path from "path";

import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGODB_URL;

const app = express();
const server = http.createServer(app); // for websockets

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/claims", claimsRoutes);
app.use("/api/policy", policyRoutes);
app.use("/api/payment", pymentRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/plans", planRoutes);

// Root Route
// This is optional, but it's a good practice to have a root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Insurance API" });
});

// Run periodic task every hour
setInterval(sendExpiredPolicyNotifications, 1000 * 60 * 60);

// MongoDB Connection
mongoose
  .connect(DB_URL, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.log("❌ Database connection failed:", err));

// Optional: Setup WebSocket (if you're using it)
setupSocket(server); // assumes your socket setup uses 'server'

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
