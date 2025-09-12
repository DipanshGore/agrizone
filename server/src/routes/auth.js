import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware, { requireRole } from "../middleware/auth.js";
const router = express.Router();

// Registration
router.post("/register", async (req, res) => {
  const { name, email, password, role, farmerDetails, customerDetails, adminDetails } = req.body;
  if (!name || !email || !password || !role)
    return res.status(400).json({ msg: "All required fields must be provided" });
  if (!["farmer", "customer", "admin"].includes(role))
    return res.status(400).json({ msg: "Invalid role" });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ msg: "User already exists" });

  const hash = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hash,
    role,
    farmerDetails: role === "farmer" ? farmerDetails : undefined,
    customerDetails: role === "customer" ? customerDetails : undefined,
    adminDetails: role === "admin" ? adminDetails : undefined,
  });

  res.status(201).json({ msg: "Registered successfully", userId: newUser._id });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ msg: "Email, password, role required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User does not exist" });
  if (user.role !== role) return res.status(400).json({ msg: `This account is registered as ${user.role}` });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });

  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

// Protected user info
router.get("/me", authMiddleware, async (req, res) => {
  res.json(req.user);
});

export default router;
