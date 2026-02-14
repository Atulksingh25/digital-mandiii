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

/* middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* static folders */
 

/* DB */
connectDB();

/* APIs */
app.use("/api/products", productRoutes);
app.use("/api/farmers", farmersRouter);


app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/uploads", express.static("uploads"));
/* pages */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.htm"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/admin.htm"));
});

app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/user.htm"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
