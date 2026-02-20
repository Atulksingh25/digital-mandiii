import express from "express";
import multer from "multer";
import Farmer from "../models/farmers.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

/* ADD FARMER */
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const farmer = new Farmer({
      name: req.body.name,
      city: req.body.city,
      mobile: req.body.mobile,
      product: req.body.product,
      price: req.body.price,
      address: req.body.address,
      photo: req.file ? `/uploads/${req.file.filename}` : null
    });
    await farmer.save();
    res.status(201).json({ success: true, farmer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/* GET FARMERS */
router.get("/", async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/* UPDATE FARMER */
router.put("/:id", upload.single("photo"), async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) return res.status(404).json({ message: "Farmer not found" });

    farmer.name = req.body.name;
    farmer.city = req.body.city;
    farmer.mobile = req.body.mobile;
    farmer.product = req.body.product;
    farmer.price = req.body.price;
    if (req.file) farmer.photo = `/uploads/${req.file.filename}`;

    await farmer.save();
    res.json(farmer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* DELETE FARMER */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Farmer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Farmer not found" });
    res.json({ message: "Farmer deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* LOGIN FARMER */
router.post("/login", async (req, res) => {
  try {
    const { mobile } = req.body;

    const farmer = await Farmer.findOne({ mobile });

    if (!farmer) {
      return res.status(401).json({ success: false, message: "Invalid mobile number" });
    }

    res.json({ success: true, farmer });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
export default router;
