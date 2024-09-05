const express = require('express');
const Product = require('../models/productModel');
const { createProduct, getAllProducts } = require('../controllers/productController');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { bucket } = require('../config/firebase.config');

// Route to handle product creation with image upload
router
    .post('/', upload.array('images', 12), createProduct)
    .get('/', getAllProducts)

module.exports = router;
