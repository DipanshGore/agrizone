import express from "express";
import { verifyToken, requireRole } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// GET all users (admin only)
router.get("/users", verifyToken, requireRole("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE user by ID (admin only)
router.delete("/users/:id", verifyToken, requireRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
