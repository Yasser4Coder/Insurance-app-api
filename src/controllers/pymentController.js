import Policy from "../models/Policy.js";
import User from "../models/User.js";

import { ChargilyClient } from "@chargily/chargily-pay";

const client = new ChargilyClient({
  api_key: "test_sk_8tV9m0EBAGF9kQErEOM849rJwObGFoESKqRPJ7Sn",
  mode: "test",
});

const payForPolicy = async (req, res) => {
  const { policyId } = req.params;

  try {
    const policy = await Policy.findById(policyId);
    if (!policy) return res.status(404).json({ error: "Policy not found" });

    if (policy.status !== "pending") {
      return res
        .status(400)
        .json({ error: "Payment already completed or invalid policy status" });
    }

    const user = await User.findById(policy.user);
    if (!user) return res.status(404).json({ error: "User not found" });

    // create checkout
    const checkout = await client.createCheckout({
      success_url: "https://your-website.com/success",
      amount: policy.price,
      currency: "dzd",
    });

    policy.checkoutId = checkout.id;
    await policy.save();

    return res.status(200).json({
      message: "Redirect user to complete payment",
      checkout_url: checkout.checkout_url,
    });
  } catch (err) {
    console.error("Payment error:", err);
    return res.status(500).json({ error: "Payment failed" });
  }
};

export default payForPolicy;
