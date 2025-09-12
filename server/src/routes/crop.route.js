import express from "express";
import Crop from "../models/Crop.js";

const router = express.Router();

// Get all crops
router.get("/", async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Add new crop
router.post("/", async (req, res) => {
  try {
    const crop = new Crop(req.body);
    await crop.save();
    res.json(crop);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Update crop
router.put("/:id", async (req, res) => {
  try {
    const crop = await Crop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(crop);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete crop
router.delete("/:id", async (req, res) => {
  try {
    await Crop.findByIdAndDelete(req.params.id);
    res.json({ msg: "Crop deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
