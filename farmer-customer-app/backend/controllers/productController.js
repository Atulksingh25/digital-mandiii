import Product from "../models/products.js";
import Farmer from "../models/farmers.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

/* ================= ADD PRODUCT ================= */
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      mrp,
      stock,
      description,
      isNew,
      isSurplus,
      farmerId
    } = req.body;

    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    let imageUrl = "";

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "products"
      });

      imageUrl = upload.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const product = await Product.create({
      name,
      category,
      price: Number(price),
      mrp: Number(mrp) || 0,
      stock: Number(stock) || 0,
      description,
      isNew: isNew === "true",
      isSurplus: isSurplus === "true",
      productImage: imageUrl,
      farmer: farmer._id
    });

    res.status(201).json(product);

  } catch (err) {
    console.error("ADD ERROR:", err);
    res.status(500).json({ message: "Product add failed" });
  }
};


/* ================= GET ALL ================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("farmer");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};


/* ================= GET SINGLE ================= */
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("farmer");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};


/* ================= UPDATE PRODUCT ================= */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });

    const {
      name,
      category,
      price,
      mrp,
      stock,
      description,
      isNew,
      isSurplus,
      farmerId
    } = req.body;

    if (farmerId) {
      const farmer = await Farmer.findById(farmerId);
      if (!farmer) return res.status(404).json({ message: "Farmer not found" });
      product.farmer = farmer._id;
    }

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "products"
      });
      product.productImage = upload.secure_url;
      fs.unlinkSync(req.file.path);
    }

    product.name = name;
    product.category = category;
    product.price = Number(price);
    product.mrp = Number(mrp) || 0;
    product.stock = Number(stock) || 0;
    product.description = description;
    product.isNew = isNew === "true";
    product.isSurplus = isSurplus === "true";

    await product.save();
    res.json(product);

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: "Update failed" });
  }
};


/* ================= DELETE PRODUCT ================= */
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};