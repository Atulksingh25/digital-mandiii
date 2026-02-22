import express from "express";
import multer from "multer";
import path from "path";

import {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/* ================= ROUTES ================= */

// GET ALL
router.get("/", getProducts);

// GET SINGLE
router.get("/:id", getSingleProduct);

// CREATE
router.post("/", upload.single("productImage"), addProduct);

// UPDATE
router.put("/:id", upload.single("productImage"), updateProduct);

// DELETE
router.delete("/:id", deleteProduct);

export default router;