import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    mrp: {
      type: Number,
      default: 0,
    },

    stock: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      default: "",
    },

    isNew: {
      type: Boolean,
      default: false,
    },

    isSurplus: {
      type: Boolean,
      default: false,
    },

    productImage: {
      type: String,
    },

    farmer: {
      name: String,
      address: String,
      sourcePlace: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
