import express from "express";
import multer from "multer";
import path from "path";
import Product from "../models/products.js";

const router = express.Router();

/* ================= MULTER SETUP ================= */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

/* ================= GET ALL ================= */
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/* ================= GET SINGLE ================= */
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

/* ================= CREATE PRODUCT ================= */
router.post("/", upload.single("productImage"), async (req, res) => {
  try {

    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price),
      mrp: Number(req.body.mrp) || 0,
      stock: Number(req.body.stock) || 0,
      description: req.body.description || "",
      isNew: req.body.isNew === "true",
      isSurplus: req.body.isSurplus === "true",
      productImage: req.file ? `/uploads/${req.file.filename}` : "",

      farmer: {
        name: req.body.farmerName || "",
        address: req.body.farmerAddress || "",
        sourcePlace: req.body.sourcePlace || ""
      }
    });

    await newProduct.save();

    res.status(201).json(newProduct);

  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: "Error creating product" });
  }
});



/* ================= UPDATE PRODUCT ================= */
router.put("/:id", upload.single("productImage"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Not found" });

    product.name = req.body.name;
    product.category = req.body.category;
    product.price = req.body.price;
    product.mrp = req.body.mrp;
    product.stock = req.body.stock;
    product.description = req.body.description;
    product.isNew = req.body.isNew === "true" || req.body.isNew === true;
    product.isSurplus = req.body.isSurplus === "true" || req.body.isSurplus === true;

    if (req.file) {
      product.productImage = `/uploads/${req.file.filename}`;
    }

    product.farmer = {
      name: req.body.farmerName,
      address: req.body.farmerAddress,
      sourcePlace: req.body.sourcePlace
    };

    await product.save();
    res.json(product);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating product" });
  }
});

/* ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
