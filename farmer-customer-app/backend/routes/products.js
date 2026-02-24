import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

/* ================= MULTER CONFIG ================= */

// ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
});

/* ================= ROUTES ================= */

router.get("/", getProducts);
router.get("/:id", getSingleProduct);

router.post("/", upload.single("productImage"), addProduct);
router.put("/:id", upload.single("productImage"), updateProduct);

router.delete("/:id", deleteProduct);

export default router;