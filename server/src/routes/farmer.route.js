import express from "express";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import User from "../models/User.js";

const router = express.Router();

// 📌 Get farmer profile
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// 📌 Update profile details
router.put("/me", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

// 📌 Upload / Update profile picture
router.put(
  "/me/profile-picture",
  verifyToken,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { profileImage: `/uploads/${req.file.filename}` },
        { new: true }
      ).select("-password");

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: "Error uploading profile picture" });
    }
  }
);

// 📌 Remove profile picture
router.delete("/me/profile-picture", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { profileImage: "" } },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Error removing profile picture" });
  }
});

export default router;
