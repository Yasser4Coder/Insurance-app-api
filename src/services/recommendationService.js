// services/recommendationService.js

import Plan from "../models/Plan.js";

/**
 * Recommend plans based on user input
 * @param {Object} preferences
 * @param {String} preferences.carType
 * @param {String} preferences.carAge
 * @param {String[]} preferences.desiredCoverages
 * @param {String} preferences.priceSensitivity
 * @returns {Array} list of plans
 */
export async function recommendPlans({
  carType,
  carAge,
  desiredCoverages,
  priceSensitivity,
}) {
  try {
    const allPlans = await Plan.find({ isActive: true });

    let filteredPlans = allPlans.filter((plan) => {
      const matchesCarType = plan.eligibleCarTypes.includes(carType);
      const matchesCarAge = plan.eligibleCarAges.includes(carAge);
      const matchesCoverages = desiredCoverages.every((coverage) =>
        plan.coverages.includes(coverage)
      );
      return matchesCarType && matchesCarAge && matchesCoverages;
    });

    if (priceSensitivity) {
      if (priceSensitivity === "cheap") {
        filteredPlans = filteredPlans.sort((a, b) => a.price - b.price);
      } else if (priceSensitivity === "expensive") {
        filteredPlans = filteredPlans.sort((a, b) => b.price - a.price);
      }
    }

    return filteredPlans;
  } catch (error) {
    console.error("Error recommending plans:", error);
    throw new Error("Failed to recommend plans");
  }
}
