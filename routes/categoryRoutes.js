const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');

// Get all categories from categories table
router.get('/categary', categoryController.getAllCategories);

// Create new event category
 router.post('/addcategary', categoryController.createEventCategory);

//Update event category
router.put('/updatecategary/:id',categoryController.updateEventCategory);

//delete event category
router.delete('/deletecategary/:id',categoryController.deleteEventCategory)

module.exports = router; 