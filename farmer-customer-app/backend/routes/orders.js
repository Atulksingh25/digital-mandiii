import express from "express";
import Cart from "../models/cart.js";
import Order from "../models/order.js";

const router = express.Router();

// CREATE ORDER
router.post("/", async (req, res) => {
  const cartItems = await Cart.find().populate("product");
  if (!cartItems.length) return res.status(400).json({ message: "Cart is empty" });

  const products = cartItems.map(item => ({
    product: item.product._id,
    quantity: item.quantity
  }));

  const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const order = new Order({ products, totalAmount });
  await order.save();

  // Clear cart
  await Cart.deleteMany();

  res.json(order);
});

// GET ALL ORDERS
router.get("/", async (req, res) => {
  const orders = await Order.find().populate("products.product");
  res.json(orders);
});

export default router;
