import Policy from "../models/Policy.js";

export const handleWebhook = async (req, res) => {
  try {
    const { checkout_id, status } = req.body;

    const policy = await Policy.findOne({ checkoutId: checkout_id });
    if (!policy) return res.status(404).json({ error: "Policy not found." });

    if (status === "paid") {
      policy.paymentStatus = "paid";
      policy.status = "active";
      await policy.save();
    } else if (status === "failed") {
      policy.paymentStatus = "failed";
      policy.status = "cancelled";
      await policy.save();
    }

    res.status(200).json({ message: "Webhook processed." });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ error: "Webhook processing failed." });
  }
};
