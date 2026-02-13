import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    mobile: { type: String, required: true },
    product: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    photo: { type: String } // image path
  },
  { timestamps: true }
);

export default mongoose.model("Farmer", farmerSchema);
