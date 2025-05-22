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
  claims: { type: Number, default: 0 },
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema);
export default Vehicle;
