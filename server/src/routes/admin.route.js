import express from "express";
import User from "../models/User.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Get all users
router.get("/users", verifyAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Approve user
router.patch("/users/:id/approve", verifyAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete user
router.delete("/users/:id", verifyAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
