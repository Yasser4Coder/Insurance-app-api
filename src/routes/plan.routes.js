import express from "express";
import {
  getRecommendedPlans,
  createPlan,
  getAllPlans,
  getPlanById,
  updatePlan,
  deletePlan,
} from "../controllers/planController.js";

const router = express.Router();

router.post("/", createPlan);
router.get("/", getAllPlans);
router.get("/:id", getPlanById);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);

export default router;
