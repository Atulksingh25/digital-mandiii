import express from "express";
import Cart from "../models/cart.js";

const router = express.Router();

// GET CART
router.get("/", async (req, res) => {
  const cartItems = await Cart.find().populate("product");
  res.json(cartItems);
});

// ADD TO CART
router.post("/", async (req, res) => {
  const { productId, quantity } = req.body;
  let cartItem = await Cart.findOne({ product: productId });

  if (cartItem) {
    cartItem.quantity += quantity || 1;
    await cartItem.save();
  } else {
    cartItem = new Cart({ product: productId, quantity: quantity || 1 });
    await cartItem.save();
  }

  res.json(cartItem);
});

// REMOVE FROM CART
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Cart.findByIdAndDelete(id);
  res.json({ message: "Item removed from cart" });
});

export default router;
