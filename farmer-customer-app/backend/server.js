import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";

dotenv.config();
const app = express();

/* ===== DIRNAME FIX ===== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ===== DATABASE ===== */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

/* ===== MIDDLEWARE ===== */
app.use(cors({
  origin: "*",   // production me apna vercel domain likh sakte ho
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===== STATIC UPLOADS ===== */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ===== API ROUTES ===== */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

/* ===== TEST ROUTE ===== */
app.get("/", (req, res) => {
  res.send("🚀 Digital Mandi API Running");
});

/* ===== SERVER ===== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});