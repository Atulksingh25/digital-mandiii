import express from "express";
import multer from "multer";
import { addProduct, getProducts, deleteProduct } from "../Controllers/productController.js";
import path from "path";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import Farmer from "../models/Farmer.js";
import Product from "../models/product.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();  
import connectDB from "../config/db.js";
connectDB();
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("productImage"), addProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);

export default router;
