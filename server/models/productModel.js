const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true
    },
    imageUrl: [
        {
          originalname: { type: String },
          downloadURL: { type: String }
        }
      ],
      rating: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;