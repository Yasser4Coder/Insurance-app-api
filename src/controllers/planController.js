import { recommendPlans } from "../services/recommendationService.js";
import Plan from "../models/Plan.js";

export const getRecommendedPlans = async (req, res) => {
  const { carType, carAge, desiredCoverages, priceSensitivity } = req.body;

  try {
    const plans = await recommendPlans({
      carType,
      carAge,
      desiredCoverages,
      priceSensitivity,
    });

    res.status(200).json({ success: true, plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new plan
export const createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json({ success: true, plan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all plans (optionally filter by active/inactive)
export const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json({ success: true, plans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single plan by ID
export const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }
    res.status(200).json({ success: true, plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a plan
export const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }
    res.status(200).json({ success: true, plan });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a plan
export const deletePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }
    res.status(200).json({ success: true, message: "Plan deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
