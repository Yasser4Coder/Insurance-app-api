import express from "express";
import { handleWebhook } from "../controllers/webhookController.js";
import payForPolicy from "../controllers/pymentController.js";

const router = express.Router();

router.post("/webhook", handleWebhook);
router.post("/policy/:policyId/pay", payForPolicy);

export default router;
