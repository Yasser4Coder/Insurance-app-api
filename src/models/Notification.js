import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  claim: { type: mongoose.Schema.Types.ObjectId, ref: "Claim" },
  pdfUrl: { type: String },
});

const Notification = mongoose.model("Notification", NotificationSchema);
export default Notification;
