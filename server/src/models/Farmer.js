import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true }, // hashed password
    farmerDetails: {
      location: { type: String },
      contact: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Farmer", farmerSchema);
