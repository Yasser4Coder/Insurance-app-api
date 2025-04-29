// models/Plan.js

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
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    coverages: {
      type: [String], // ['theft', 'fire', 'natural disasters', 'collision']
      required: true,
    },
    eligibleCarTypes: {
      type: [String], // ['luxury', 'tourism', 'economic', 'SUV']
      required: true,
    },
    eligibleCarAges: {
      type: [String], // ['new', 'medium', 'old']
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
