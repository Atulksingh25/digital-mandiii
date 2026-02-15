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

/* dirname fix (ES Module) */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= MIDDLEWARE ================= */

// CORS (Vercel + Local both allow)
app.use(cors({
  origin: "*",
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

// Serve all static files from root folder
app.use(express.static(path.join(__dirname, "..")));

// uploads folder
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* ================= PAGES ================= */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../login.htm"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../admin.htm"));
});

app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "../user.htm"));
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
