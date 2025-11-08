const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');

// Get locations with dynamic field selection
router.get('/', homeController.getHomeDetails);

// // Update location
router.put('/:id', homeController.updateHomeDetails);

module.exports = router; 