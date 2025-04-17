import express from "express";
import { handleWebhook } from "../controllers/webhookController.js";

const router = express.Router();

router.post("/webhook", handleWebhook);

export default router;
