import express from "express";
import Crop from "../models/Crop.js";
import upload from "../middleware/upload.js";
import { authMiddleware } from "../middleware/auth.js"; // ✅ Import

const router = express.Router();

// 📌 Get all crops
router.get("/", async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// 📌 Add new crop (with optional image, only logged-in farmer)
router.post("/", authMiddleware, upload.single("cropImage"), async (req, res) => {
  try {
    const newCrop = new Crop({
      ...req.body,
      farmer: req.user._id, // 👨‍🌾 link crop to logged-in farmer
      cropImage: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await newCrop.save();
    res.json(newCrop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error adding crop" });
  }
});

// 📌 Update crop (farmer can update their crop)
router.put("/:id", authMiddleware, upload.single("cropImage"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.cropImage = `/uploads/${req.file.filename}`;

    const updatedCrop = await Crop.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedCrop);
  } catch (err) {
    res.status(500).json({ msg: "Error updating crop" });
  }
});

// 📌 Delete crop
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Crop.findByIdAndDelete(req.params.id);
    res.json({ msg: "Crop deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
