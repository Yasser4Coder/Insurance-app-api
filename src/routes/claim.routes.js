import express from "express";
import {
  addClaim,
  removeClaim,
  getClaim,
  updateClaim,
  getAllClaims,
  getUserClaims,
  assignExpertToClaim,
  updateClaimStatus,
  createAssessment,
} from "../controllers/claimController.js";

const router = express.Router();

router.post("/", addClaim);
router.put("/:id/assessment", createAssessment);

router.get("/", getAllClaims);

router.get("/:id", getClaim);

router.put("/:id", updateClaim);

router.delete("/:id", removeClaim);

router.get("/user/:id", getUserClaims);

router.put("/:id/assign-expert", assignExpertToClaim);

router.put("/:id/status", updateClaimStatus);

export default router;
