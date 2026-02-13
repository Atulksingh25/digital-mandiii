import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import express from "express";  
import cors from "cors";


const OrderSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  customerName: String,
  address: String,
  mobile: String,
  status: { type: String, default: "Pending" }
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
