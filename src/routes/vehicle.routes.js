import express from "express";
import {
  addVehicle,
  removeVehicle,
  getVehicle,
  updateVehicle,
  getAllVehicles,
  getUserVehicles,
} from "../controllers/vehicleController.js";

const router = express.Router();

router.post("/add", addVehicle);
router.delete("/remove/:id", removeVehicle);
router.get("/get/:id", getVehicle);
router.put("/update/:id", updateVehicle);
router.get("/all", getAllVehicles);
router.get("/user/:id", getUserVehicles);

export default router;
