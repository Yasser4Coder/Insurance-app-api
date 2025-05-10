import express from "express";
import {
  addVehicle,
  removeVehicle,
  getVehicle,
  updateVehicle,
  getAllVehicles,
  getUserVehicles,
} from "../controllers/vehicleController.js";

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post(
  "/add",
  upload.fields([
    { name: "driveLicense", maxCount: 1 },
    { name: "vehicleRegistration", maxCount: 1 },
  ]),
  addVehicle
);
router.delete("/remove/:id", removeVehicle);
router.get("/get/:id", getVehicle);
router.put("/update/:id", updateVehicle);
router.get("/all", getAllVehicles);
router.get("/user/:id", getUserVehicles);

export default router;
