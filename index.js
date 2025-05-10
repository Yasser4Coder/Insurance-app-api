import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { WebSocketServer } from "ws";
import http from "http";

import authRoutes from "./src/routes/auth.routes.js";
import vehicleRoutes from "./src/routes/vehicle.routes.js";
import claimsRoutes from "./src/routes/claim.routes.js";
import policyRoutes from "./src/routes/policy.routes.js";
import pymentRoutes from "./src/routes/pyment.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import notificationRoutes from "./src/routes/notification.routes.js";
import { setupSocket } from "./src/config/socket.js";

import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGODB_URL;

const app = express();

// app.use(express.json());
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

setupSocket(server);

app.use("/api/auth", authRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/claims", claimsRoutes);
app.use("/api/policy", policyRoutes);
app.use("/api/payment", pymentRoutes);
app.use("/api/notification", notificationRoutes);

app.get("/", (req, res) => {
  res.status(201).json({ Message: "Insurence API" });
});

//hi yasser
mongoose
  .connect(DB_URL, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err && "Database connection failed"));

app.listen(PORT, () => {
  console.log("the server is running on http://localhost:" + PORT);
});
