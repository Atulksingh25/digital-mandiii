import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import farmersRouter from "./routes/farmers.js";
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

/* ================= DIRNAME FIX ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= DATABASE ================= */
connectDB();

/* ================= ROUTES ================= */
app.use("/api/products", productRoutes);
app.use("/api/farmers", farmersRouter);
app.use("/api/auth", authRoutes);

/* ================= STATIC ================= */
app.use(express.static(path.join(__dirname, "..")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});