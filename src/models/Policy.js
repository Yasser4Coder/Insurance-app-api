import mongoose from "mongoose";

const PolicySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  type: { type: String },
  startDate: String,
  endDate: String,
  price: Number,
  status: {
    type: String,
    enum: ["pending", "active", "expired", "cancelled"],
    default: "pending",
    notified: [true, false],
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  checkoutId: String,
});

const Policy = mongoose.model("Policy", PolicySchema);
export default Policy;
