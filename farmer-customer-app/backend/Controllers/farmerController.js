import Farmer from "../models/farmer.js";

// GET all farmers
export const getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single farmer by ID
export const getFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) return res.status(404).json({ message: "Farmer not found" });
    res.json(farmer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE a farmer
export const createFarmer = async (req, res) => {
  try {
    const farmer = new Farmer({
      name: req.body.name,
      city: req.body.city,
      mobile: req.body.mobile,
      address: req.body.address,
      product: req.body.product,
      price: req.body.price,
      photo: req.file ? `/uploads/${req.file.filename}` : null // ✅ important
    });

    const savedFarmer = await farmer.save();
    res.status(201).json(savedFarmer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// UPDATE a farmer
export const updateFarmer = async (req, res) => {
  try {
    const updatedFarmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFarmer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a farmer
export const deleteFarmer = async (req, res) => {
  try {
    await Farmer.findByIdAndDelete(req.params.id);
    res.json({ message: "Farmer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
