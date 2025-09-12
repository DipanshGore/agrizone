import mongoose from "mongoose";

const cropSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer" },
  },
  { timestamps: true }
);

export default mongoose.model("Crop", cropSchema);
