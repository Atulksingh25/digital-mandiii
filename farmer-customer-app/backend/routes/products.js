import express from "express";
import multer from "multer";
import path from "path";

import {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ================= ROUTES ================= */

router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.post("/", upload.single("productImage"), addProduct);
router.put("/:id", upload.single("productImage"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;