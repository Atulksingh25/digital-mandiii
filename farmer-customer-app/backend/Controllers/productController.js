import Product from "../models/product.js";
import Farmer from "../models/Farmer.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const addProduct = async (req, res) => {
  try {
    const { name, price, farmerId } = req.body;

    const farmer = await Farmer.findById(farmerId);
    if (!farmer) return res.status(404).json({ message: "Farmer not found" });

    const upload = await cloudinary.uploader.upload(
      req.file.path,
      { folder: "products" }
    );

    fs.unlinkSync(req.file.path);

    const product = await Product.create({
      name,
      price,
      productImage: upload.secure_url,
      farmer: farmer._id
    });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Product add failed" });
  }
};

export const getProducts = async (req, res) => {
  const products = await Product.find()
    .populate("farmer"); // 🔥 VERY IMPORTANT
  res.json(products);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
