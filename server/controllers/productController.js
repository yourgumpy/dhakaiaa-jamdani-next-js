const Product = require("../models/productModel");
const { initializeApp } = require("firebase/app");
const config = require("../config/firebase.config");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");

const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app);

// Controller to create a product
const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      discount,
      inStock: inStockValue,
    } = req.body;

    const images = req.files.map((file) => ({
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        buffer: file.buffer,
      }));

    // Convert inStock to boolean if necessary
    const inStock = inStockValue === "In Stock";

    const uploadedImages = [];
    for (const file of images) {
      const storageRef = ref(
        storage,
        `_files/${Date.now()}_${file.originalname}`
      );
      const metadata = { contentType: file.mimetype };
      const snapshot = await uploadBytesResumable(
        storageRef,
        file.buffer,
        metadata
      );
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log(downloadURL);
      uploadedImages.push({
        originalname: file.originalname,
        downloadURL: downloadURL,
      });
    }
    console.log(uploadedImages);

    // Create a new product
    const product = new Product({
      title,
      description,
      category,
      price,
      inStock,
      discount,
      imageUrl: uploadedImages,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProduct, getAllProducts };
