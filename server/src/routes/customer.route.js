// src/routes/customer.route.js
import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET current customer profile
router.get("/me", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "customer")
      return res.status(403).json({ message: "Forbidden" });

    res.json({
      name: req.user.name,
      email: req.user.email,
      contact: req.user.customerDetails?.contact || "",
      address: req.user.customerDetails?.address || "",
    });
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
});

// PUT update customer profile
router.put("/me", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "customer")
      return res.status(403).json({ message: "Forbidden" });

    const { name, email, contact, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email, customerDetails: { contact, address } },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      name: updatedUser.name,
      email: updatedUser.email,
      contact: updatedUser.customerDetails?.contact || "",
      address: updatedUser.customerDetails?.address || "",
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

export default router;
