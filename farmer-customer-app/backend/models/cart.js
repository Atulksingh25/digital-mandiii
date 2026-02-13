import express from "express";
import Cart from "./Cart.js";

const router = express.Router();

// Add to Cart
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const existing = await Cart.findOne({ userId, productId });

  if (existing) {
    existing.quantity += quantity;
    await existing.save();
  } else {
    await Cart.create({ userId, productId, quantity });
  }

  res.json({ message: "Added to cart" });
});

// Get Cart
router.get("/:userId", async (req, res) => {
  const items = await Cart.find({ userId: req.params.userId });
  res.json(items);
});

export default router;
