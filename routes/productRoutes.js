const express = require('express');
const router = express.Router();
const categoryController = require('../controller/productController');
const multer = require("multer");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Get all categories from categories table
router.get('/productdetails', categoryController.getAllProducts);

// Create new event category
 router.post('/addproduct',upload.single("image"), categoryController.createProduct);

//Update event category
router.put('/updateproduct/:id',categoryController.updateProduct);

//delete event category
router.delete('/deleteproduct/:id',categoryController.deleteProduct)

module.exports = router; 