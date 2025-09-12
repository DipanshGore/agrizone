import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import farmerRoutes from "./routes/farmer.route.js";
import cropRoutes from "./routes/crop.route.js";

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api", adminRoutes);          // e.g. /api/users
app.use("/api/farmer", farmerRoutes);  // e.g. /api/farmer/me
app.use("/api/crops", cropRoutes);     // e.g. /api/crops

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
