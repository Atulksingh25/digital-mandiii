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

// ✅ PRODUCTION CORS (NO credentials)
app.use(cors({
  origin: "https://digital-mandii-idhn.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= DATABASE ================= */
connectDB();

/* ================= API ROUTES ================= */
app.use("/api/products", productRoutes);
app.use("/api/farmers", farmersRouter);

/* ================= STATIC FILES ================= */

// Serve main project root (optional)
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
