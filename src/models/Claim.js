import mongoose from "mongoose";

const ClaimSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  policy: { type: mongoose.Schema.Types.ObjectId, ref: "Policy" },
  expert: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: String,
  date: Date,
  location: String,
  wilaya: String,
  accidentType: {
    type: String,
    enum: [
      "collision",
      "theft",
      "fire",
      "vandalism",
      "natural_disaster",
      "other",
    ],
  },
  VehicleStatus: {
    type: [String], // array of strings
    required: true,
  },
  images: [String],
  status: {
    type: String,
    enum: ["pending", "in_review", "resolved", "rejected"],
    default: "pending",
  },
  assessment: {
    photos: [String],
    description: String,
    insurancePrice: String,
  },
});

const Claim = mongoose.model("Claim", ClaimSchema);
export default Claim;
