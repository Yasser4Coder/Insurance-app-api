import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  registrationNumber: String,
  model: String,
  brand: String,
  year: Number,
  chassisNumber: String,
  driveLicense: String,
  vehicleRegistration: String,
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);
export default Vehicle;
