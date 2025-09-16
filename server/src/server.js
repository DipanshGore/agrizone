import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";        // existing
import adminRoutes from "./routes/admin.js";      // existing
import farmerRoutes from "./routes/farmer.route.js"; // existing
import cropRoutes from "./routes/crop.route.js";  // existing
import customerRoutes from "./routes/customer.route.js"; // 👈 added
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api", adminRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/customer", customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
