import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number },
  category: { type: String },
  description: { type: String },
  stock: { type: Number, default: 0 },

  isNewProduct: {
    type: Boolean,
    default: false
  },

  isSurplusProduct: {
    type: Boolean,
    default: false
  },

  farmer: {                      // 👈 ADD THIS
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farmer"
  },

  image: { type: String }

}, { timestamps: true });

export default mongoose.model("Product", productSchema);