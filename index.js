/**
 * Requires the Express module for building the server.
 */
const express = require('express');

/**
 * Creates an Express application instance.
 */
const app = express();

/**
 * Requires the Shop class from the './classes/Shops.js' file.
 */
const Shop = require('./classes/Shops.js'); // Assuming Shops.js is renamed to Shop.js

/**
 * Middleware to parse incoming JSON request bodies.
 */
app.use(express.json());

/**
 * Array to hold instances of all created Shop objects.
 */
const allShops = [];

// Define the API endpoint

/**
 * POST API endpoint to create or update a shop and its products.
 * 
 * @param {string} req.params.shopName - Name of the shop to create or update.
 * @param {Object[]} req.body.products - Array of product objects to upsert (update or insert).
 * @param {Object} product - An object representing a product.
 * @param {string} product.id - Unique identifier for the product.
 * @param {string} product.name - Name of the product.
 * @param {number} product.price - Price of the product.
 * 
 * @returns {Object} A JSON response with a success message and the updated shop object.
 */
app.post('/api/shops/:shopName', (req, res) => {
  const shopName = req.params.shopName;
  const { products } = req.body;

  // Find the shop with the given shopId
  let shop = allShops.find(s => s.id === parseInt(shopName));

  // If the shop doesn't exist, create a new one
  if (!shop) {
    shop = new Shop(`${shopName}`);
    allShops.push(shop);
  }

  // Upsert each product
  products.forEach(product => {
    const { id, name, price } = product;
    const existingProduct = shop.toys.find(t => t.id === id);
    if (existingProduct) {
      // Update existing product
      existingProduct.name = name;
      existingProduct.price = price;
    } else {
      // Insert new product
      shop.addToy(name, id, price);
    }
  });

  res.status(200).json({ message: 'Shop and products upserted successfully', shop });
});

// API endpoint to get all shop objects
/**
 * GET API endpoint to retrieve all shop objects in the `allShops` array.
 * 
 * @returns {Object[]} An array containing all Shop objects currently stored.
 */
app.get('/api/shops', (req, res) => {
  res.json(allShops);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
