import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // ⚡ latest Mongoose me options ki zarurat nahi
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

export default connectDB;
