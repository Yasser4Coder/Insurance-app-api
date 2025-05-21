import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String, // ["rc", "intermediaire", "tous_risques"]
      required: true,
    },
    usageTypes: String, // ["personal", "commercial"]

    eligibleCarTypes: {
      type: String, // ['luxury', 'tourism', 'economic', 'SUV']
      required: true,
    },
    eligibleCarAges: {
      type: String, // ['new', 'medium', 'old']
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model("Plan", planSchema);
