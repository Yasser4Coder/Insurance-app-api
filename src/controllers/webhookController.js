import Policy from "../models/Policy.js";
import { verifySignature } from "@chargily/chargily-pay";

const API_SECRET_KEY = "test_sk_8tV9m0EBAGF9kQErEOM849rJwObGFoESKqRPJ7Sn";

export const handleWebhook = async (req, res) => {
  const signature = req.get("signature") || "";
  const payload = req.rawBody;

  console.log("Raw Payload:", payload.toString());
  console.log("Signature:", signature);

  if (!signature) {
    console.log("Signature header is missing");
    res.sendStatus(400);
    return;
  }

  try {
    if (!verifySignature(payload, signature, API_SECRET_KEY)) {
      console.log("Signature is invalid");
      res.sendStatus(403);
      return;
    }
  } catch (error) {
    console.log(
      "Something happened while trying to process the request to the webhook"
    );
    res.sendStatus(403);
    return;
  }

  const event = req.body;

  const policy = await Policy.findOne({ checkoutId: event.data.id });
  if (!policy) return res.status(404).json({ error: "policy not found" });

  if (event.type === "checkout.canceled") {
    await policy.deleteOne();
  }

  if (event.type === "checkout.paid") {
    policy.status = "active";
    policy.paymentStatus = "paid";
    await policy.save();
  }

  res.sendStatus(200);
};
