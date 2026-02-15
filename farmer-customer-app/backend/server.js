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

/* dirname fix */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= MIDDLEWARE ================= */

app.use(cors({
  origin: [
    "http://localhost:5000",
    "https://digital-mandii-kqya.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
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

// serve frontend folder properly
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* ================= DEFAULT ROUTE ================= */

// backend test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
