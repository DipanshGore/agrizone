import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["farmer", "customer", "admin"], required: true },

    farmerDetails: {
      farmName: String,
      farmLocation: String,
      crops: [String],
    },
    customerDetails: {
      address: String,
    },
    adminDetails: {
      businessName: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
