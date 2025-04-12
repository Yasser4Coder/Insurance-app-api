import mongoose from "mongoose";

const ClaimSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  policy: { type: mongoose.Schema.Types.ObjectId, ref: "Policy" },
  description: String,
  date: Date,
  status: {
    type: String,
    enum: ["pending", "in_review", "resolved", "rejected"],
    default: "pending",
  },
  expert: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Claim = mongoose.model("Claim", ClaimSchema);
export default Claim;
