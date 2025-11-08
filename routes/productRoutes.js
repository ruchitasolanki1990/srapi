const express = require('express');
const router = express.Router();
const categoryController = require('../controller/productController');

// Get all categories from categories table
router.get('/productdetails', categoryController.getAllProducts);

// Create new event category
 router.post('/addproduct', categoryController.createProduct);

//Update event category
router.put('/updateproduct/:id',categoryController.updateProduct);

//delete event category
router.delete('/deleteproduct/:id',categoryController.deleteProduct)

module.exports = router; 