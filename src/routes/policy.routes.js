import express from "express";
import {
  createPolicy,
  getPolicy,
  updatePolicy,
  deletePolicy,
  getAllPolicies,
  getPoliciesByUser,
  getPoliciesByVehicle,
  //   autoChangePolicyStatus,
} from "../controllers/policyController.js";

const router = express.Router();

router.post("/create", createPolicy);
router.get("/get/:id", getPolicy);
router.put("/update/:id", updatePolicy);
router.delete("/delete/:id", deletePolicy);
router.get("/all", getAllPolicies);
router.get("/user/:user", getPoliciesByUser);
router.get("/vehicle/:vehicle", getPoliciesByVehicle);
// router.post("/auto-change-status", autoChangePolicyStatus);

export default router;
