import Policy from "../models/Policy.js";
import User from "../models/User.js";
import fetch from "node-fetch";

const createPolicy = async (req, res) => {
  const { type, startDate, endDate, user, vehicle, price } = req.body;

  try {
    const existingPolicy = await Policy.findOne({
      user,
      vehicle,
      status: "active",
    });
    if (existingPolicy) {
      return res.status(400).json({
        error: "An active policy already exists for this user and vehicle",
      });
    }

    const policy = await Policy.create({
      type,
      startDate,
      endDate,
      user,
      vehicle,
      price,
      status: "pending",
    });

    return res.status(201).json({
      message: "Policy created successfully. Proceed to payment.",
      policy,
    });
  } catch (err) {
    console.error("Error creating policy:", err);
    return res.status(500).json({ error: "Failed to create policy." });
  }
};

const getPolicy = async (req, res) => {
  const { id } = req.params;

  try {
    const policy = await Policy.findById({ _id: id });

    if (!policy) {
      return res.status(404).json({ error: "Policy not found" });
    }

    const policyData = policy.toObject();
    if (policy.status === "active" && new Date(policy.endDate) < new Date()) {
      policy.status = "expired";
      await policy.save();

      policyData.status = "expired";
    }

    res.status(200).json({ policy: policyData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePolicy = async (req, res) => {
  const { id } = req.params;
  const { type, startDate, endDate, status, user, vehicle, price } = req.body;

  try {
    const policy = await Policy.findByIdAndUpdate(
      id,
      {
        type,
        startDate,
        endDate,
        status,
        user,
        vehicle,
        price,
      },
      { new: true, runValidators: true }
    );

    if (!policy) {
      return res.status(404).json({ error: "Policy not found" });
    }

    res.status(200).json({ message: "Policy updated successfully", policy });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deletePolicy = async (req, res) => {
  const { id } = req.params;

  try {
    const policy = await Policy.findByIdAndDelete(id);

    if (!policy) {
      return res.status(404).json({ error: "Policy not found" });
    }

    res.status(200).json({ message: "Policy deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find();
    const updatedPolicies = [];
    const expiredPolicyIds = [];

    for (const policy of policies) {
      const policyData = policy.toObject();

      if (policy.status === "active" && new Date(policy.endDate) < new Date()) {
        policyData.status = "expired";
        expiredPolicyIds.push(policy._id);
      }

      updatedPolicies.push(policyData);
    }

    if (expiredPolicyIds.length > 0) {
      await Policy.updateMany(
        { _id: { $in: expiredPolicyIds } },
        { $set: { status: "expired" } }
      );
    }

    res.status(200).json({ policies: updatedPolicies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPoliciesByUser = async (req, res) => {
  const { user } = req.params;

  try {
    const policies = await Policy.find({ user });
    const updatedPolicies = [];
    const expiredPolicyIds = [];

    for (const policy of policies) {
      const policyData = policy.toObject();

      if (policy.status === "active" && new Date(policy.endDate) < new Date()) {
        policyData.status = "expired";
        expiredPolicyIds.push(policy._id);
      }

      updatedPolicies.push(policyData);
    }

    if (expiredPolicyIds.length > 0) {
      await Policy.updateMany(
        { _id: { $in: expiredPolicyIds } },
        { $set: { status: "expired" } }
      );
    }

    res.status(200).json({ policies: updatedPolicies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPoliciesByVehicle = async (req, res) => {
  const { vehicle } = req.params;

  try {
    const policies = await Policy.find({ vehicle });
    const updatedPolicies = [];
    const expiredPolicyIds = [];

    for (const policy of policies) {
      const policyData = policy.toObject();

      if (policy.status === "active" && new Date(policy.endDate) < new Date()) {
        policyData.status = "expired";
        expiredPolicyIds.push(policy._id);
      }

      updatedPolicies.push(policyData);
    }

    if (expiredPolicyIds.length > 0) {
      await Policy.updateMany(
        { _id: { $in: expiredPolicyIds } },
        { $set: { status: "expired" } }
      );
    }

    res.status(200).json({ policies: updatedPolicies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  createPolicy,
  getPolicy,
  updatePolicy,
  deletePolicy,
  getAllPolicies,
  getPoliciesByUser,
  getPoliciesByVehicle,
};
