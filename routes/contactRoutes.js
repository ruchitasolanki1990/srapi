const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

router.get('/', contactController.getAllDetailsOfContact);

router.put('/:id',contactController.updateContactDetails);

module.exports = router; 
