import mongoose from "mongoose";

const ExpertReportSchema = new mongoose.Schema({
  claim: { type: mongoose.Schema.Types.ObjectId, ref: "Claim" },
  expert: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  inspectionDate: Date,
  damageDescription: String,
  estimatedCost: Number,
  images: [String],
});

const ExpertReport = mongoose.model("ExpertReport", ExpertReportSchema);
export default ExpertReport;
