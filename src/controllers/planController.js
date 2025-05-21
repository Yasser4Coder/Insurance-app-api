import Plan from "../models/Plan.js";

export const getRecommendedPlans = async (req, res) => {
  const { carType, cv, usage, carYear } = req.body;

  if (!carType || !cv || !usage || !carYear) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide all required fields: carType, cv, usage, carYear",
    });
  }

  function calculateInsurancePrice({
    carType,
    cv,
    usage,
    insuranceType,
    carYear,
  }) {
    let basePrice = 10000; // DZD
    const currentYear = new Date().getFullYear();
    const carAge = currentYear - carYear;

    // 🔹 Adjust by CV
    if (cv <= 5) basePrice += 0;
    else if (cv <= 8) basePrice += 3000;
    else basePrice += 6000;

    // 🔹 Car Type Multiplier
    const typeMultiplier = {
      economy: 1,
      suv: 1.2,
      luxury: 1.5,
    };
    basePrice *= typeMultiplier[carType.toLowerCase()] || 1;

    // 🔹 Usage Multiplier
    const usageMultiplier = {
      personal: 1,
      commercial: 1.3,
    };
    basePrice *= usageMultiplier[usage.toLowerCase()] || 1;

    // 🔹 Insurance Type Fee
    const insuranceTypeFee = {
      mandatory: 1000,
      "medium coverage": 2500,
      "full coverage": 5000,
    };
    basePrice += insuranceTypeFee[insuranceType.toLowerCase()] || 0;

    // 🔹 Car Age Adjustment
    if (carAge > 10) {
      basePrice *= 1.1; // Older than 10 years = +10%
    } else if (carAge <= 3) {
      basePrice *= 0.95; // New car discount (<= 3 years old) = -5%
    }

    return Math.round(basePrice);
  }
  res.status(200).json({
    success: true,
    plans: [
      // === MANDATORY INSURANCE ===
      {
        title: "Mandatory Insurance 3 months",
        insuranceType: "mandatory",
        duration: 3,
        description:
          "✔️ Third-party liability coverage (RC)\n" +
          "✔️ Valid for 3 months\n" +
          "✔️ Covers damage caused to others\n" +
          "❌ Does not cover damage to your own vehicle\n" +
          "❌ No theft, fire, or natural disaster coverage",
        price: calculateInsurancePrice({
          carType,
          cv,
          usage,
          insuranceType: "mandatory",
          carYear,
        }),
      },
      {
        title: "Mandatory Insurance 6 months",
        insuranceType: "mandatory",
        duration: 6,
        description:
          "✔️ Third-party liability coverage (RC)\n" +
          "✔️ Valid for 6 months\n" +
          "✔️ Covers damage caused to others\n" +
          "✔️ Complies with Algerian insurance regulations\n" +
          "❌ Does not cover damage to your own vehicle\n" +
          "❌ No theft, fire, or natural disaster coverage",
        price:
          calculateInsurancePrice({
            carType,
            cv,
            usage,
            insuranceType: "mandatory",
            carYear,
          }) * 2,
      },
      {
        title: "Mandatory Insurance 12 months",
        insuranceType: "mandatory",
        duration: 12,
        description:
          "✔️ Third-party liability coverage (RC)\n" +
          "✔️ Valid for 12 months\n" +
          "✔️ Covers damage caused to others\n" +
          "✔️ Complies with Algerian insurance regulations\n" +
          "✔️ Official insurance certificate provided\n" +
          "❌ Does not cover damage to your own vehicle\n" +
          "❌ No theft, fire, or natural disaster coverage",
        price:
          calculateInsurancePrice({
            carType,
            cv,
            usage,
            insuranceType: "mandatory",
            carYear,
          }) * 3.2,
      },

      // === MEDIUM COVERAGE INSURANCE ===
      {
        title: "Medium Coverage Insurance 3 months",
        insuranceType: "medium coverage",
        duration: 3,
        description:
          "✔️ Third-party liability (RC)\n" +
          "✔️ Partial coverage for theft and fire\n" +
          "✔️ Assistance in case of accidents\n" +
          "✔️ Valid for 3 months\n" +
          "❌ Does not fully cover own vehicle damages\n" +
          "❌ Limited coverage in natural disasters",
        price: calculateInsurancePrice({
          carType,
          cv,
          usage,
          insuranceType: "medium coverage",
          carYear,
        }),
      },
      {
        title: "Medium Coverage Insurance 6 months",
        insuranceType: "medium coverage",
        duration: 6,
        description:
          "✔️ Third-party liability (RC)\n" +
          "✔️ Partial coverage for theft and fire\n" +
          "✔️ Assistance in case of accidents\n" +
          "✔️ Valid for 6 months\n" +
          "❌ Does not fully cover own vehicle damages\n" +
          "❌ Limited coverage in natural disasters",
        price:
          calculateInsurancePrice({
            carType,
            cv,
            usage,
            insuranceType: "medium coverage",
            carYear,
          }) * 2,
      },
      {
        title: "Medium Coverage Insurance 12 months",
        insuranceType: "medium coverage",
        duration: 12,
        description:
          "✔️ Third-party liability (RC)\n" +
          "✔️ Partial coverage for theft and fire\n" +
          "✔️ Assistance in case of accidents\n" +
          "✔️ Valid for 12 months\n" +
          "❌ Does not fully cover own vehicle damages\n" +
          "❌ Limited coverage in natural disasters",
        price:
          calculateInsurancePrice({
            carType,
            cv,
            usage,
            insuranceType: "medium coverage",
            carYear,
          }) * 3.2,
      },

      // === FULL COVERAGE INSURANCE ===
      {
        title: "Full Coverage Insurance 3 months",
        insuranceType: "full coverage",
        duration: 3,
        description:
          "✔️ Third-party liability (RC)\n" +
          "✔️ Damage to your own vehicle (even if at fault)\n" +
          "✔️ Theft, fire, and natural disaster coverage\n" +
          "✔️ Legal protection and assistance\n" +
          "✔️ Valid for 3 months\n" +
          "✔️ Recommended for new or high-value vehicles",
        price: calculateInsurancePrice({
          carType,
          cv,
          usage,
          insuranceType: "full coverage",
          carYear,
        }),
      },
      {
        title: "Full Coverage Insurance 6 months",
        insuranceType: "full coverage",
        duration: 6,
        description:
          "✔️ Third-party liability (RC)\n" +
          "✔️ Damage to your own vehicle (even if at fault)\n" +
          "✔️ Theft, fire, and natural disaster coverage\n" +
          "✔️ Legal protection and assistance\n" +
          "✔️ Valid for 6 months\n" +
          "✔️ Recommended for new or high-value vehicles",
        price:
          calculateInsurancePrice({
            carType,
            cv,
            usage,
            insuranceType: "full coverage",
            carYear,
          }) * 2,
      },
      {
        title: "Full Coverage Insurance 12 months",
        insuranceType: "full coverage",
        duration: 12,
        description:
          "✔️ Third-party liability (RC)\n" +
          "✔️ Damage to your own vehicle (even if at fault)\n" +
          "✔️ Theft, fire, and natural disaster coverage\n" +
          "✔️ Legal protection and assistance\n" +
          "✔️ Valid for 12 months\n" +
          "✔️ Recommended for new or high-value vehicles",
        price:
          calculateInsurancePrice({
            carType,
            cv,
            usage,
            insuranceType: "full coverage",
            carYear,
          }) * 3.2,
      },
    ],
  });
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
