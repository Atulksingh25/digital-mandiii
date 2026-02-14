import express from "express";
import Order from "../models/order.js"; // create order model
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const order = new Order({ items, createdAt: new Date() });
    await order.save();

    res.status(201).json({ success: true, order });
  } catch(err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
