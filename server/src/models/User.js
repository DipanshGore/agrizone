import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["farmer", "customer", "admin"], 
      default: "farmer" 
    },

    // Role-specific details
    farmerDetails: {
      farmName: String,
      farmLocation: String,
      crops: [String],
      contact: String,
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
