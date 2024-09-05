const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 8000;
const productRoute = require('./routes/productRoute'); // Ensure this path is correct

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB URI from environment variables
const uri = process.env.MONGODB_URL;

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Example route
app.get('/', (req, res) => {
  res.send('Hello, this is your Express app!');
});

// Use the product route
app.use("/products", productRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
