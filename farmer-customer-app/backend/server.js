import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import productRoutes from "./routes/products.js";
import farmersRouter from "./routes/farmers.js";

dotenv.config();
const app = express();

/* ================= DIRNAME FIX ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= MIDDLEWARE ================= */

// ✅ SIMPLE & SAFE CORS
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= DATABASE ================= */
connectDB();

/* ================= API ROUTES ================= */
app.use("/api/products", productRoutes);
app.use("/api/farmers", farmersRouter);

/* ================= STATIC FILES ================= */

// ⚠ Tumhare project me frontend root me hai
// Isliye agar serve karna ho to parent folder serve karo:

app.use(express.static(path.join(__dirname, "..")));

// uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= DEFAULT ROUTE ================= */

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
