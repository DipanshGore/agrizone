import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "farmer", "customer"], default: "customer" },
    approved: { type: Boolean, default: false },
    profileImage: { type: String }, // ✅ new field


    // Embed customer details for simplicity
    customerDetails: {
      contact: { type: String },
      address: { type: String },
    },

    // Optional: farmer/admin details
    farmerDetails: { type: Object },
    adminDetails: { type: Object },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
