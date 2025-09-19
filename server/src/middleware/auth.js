import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verify JWT and attach user to req.user
export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
};

// Admin role verification middleware
export const verifyAdmin = async (req, res, next) => {
  await verifyToken(req, res, async () => {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  });
};