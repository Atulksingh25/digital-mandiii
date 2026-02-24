import Product from "../models/products.js";

/* ================= ADD PRODUCT ================= */
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      mrp,
      category,
      description,
      stock,
      isNewProduct,
      isSurplusProduct,
      farmer,
    } = req.body;

    const product = new Product({
      name,
      price,
      mrp,
      category,
      description,
      stock,
      isNewProduct: isNewProduct === "true" || isNewProduct === true,
      isSurplusProduct: isSurplusProduct === "true" || isSurplusProduct === true,
      farmer,
      image: req.file ? req.file.filename : null,
    });

    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product,
    });

  } catch (error) {
    console.log(error); // important
    res.status(500).json({
      message: "Error adding product",
      error: error.message,
    });
  }
};


/* ================= GET ALL PRODUCTS ================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("farmer");
    res.status(200).json(products);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};


/* ================= GET SINGLE PRODUCT ================= */
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("farmer");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};


/* ================= UPDATE PRODUCT ================= */
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      mrp,
      category,
      description,
      stock,
      isNewProduct,
      isSurplusProduct,
      farmer,
    } = req.body;

    const updatedData = {
      name,
      price,
      mrp,
      category,
      description,
      stock,
      isNewProduct: isNewProduct === "true" || isNewProduct === true,
      isSurplusProduct: isSurplusProduct === "true" || isSurplusProduct === true,
      farmer,
    };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};


/* ================= DELETE PRODUCT ================= */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      
      message: "Error deleting product",
      error: error.message,
    });
  }
};