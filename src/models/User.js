import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  roles: {
    type: Map,
    of: Number,
    default: { User: 2001 },
  },
  phone: String,
  address: String,
  refreshToken: String,
});

const User = mongoose.model("User", UserSchema);
export default User;
