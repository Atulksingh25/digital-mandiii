import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import farmersRouter from "./routes/farmers.js";
import productRoutes from "./routes/products.js";

dotenv.config();
const app = express();

/* ================= DIRNAME FIX ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= MIDDLEWARE ================= */

// ✅ SIMPLE & SAFE CORS (allows all origins)
app.use(
  cors({
    origin: [
      "https://digital-mandii-p4ci.vercel.app",
      "https://digital-mandii-idhn.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= DATABASE ================= */
connectDB();

/* ================= API ROUTES ================= */
app.use("/api/products", productRoutes);
app.use("/api/farmers", farmersRouter);

/* ================= STATIC FILES ================= */

// Optional static serving
app.use(express.static(path.join(__dirname, "..")));

// uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.status(200).send("Backend is running 🚀");
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
