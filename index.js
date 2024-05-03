const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.json());

class Toys {
    constructor(name, id, price) {
        this.name = name;
        this.id = id;
        this.price = price;
    }
}

// Define the Shop class
class Shop {
    constructor(name) {
        this.id = uuidv4();
        this.name = name;
        this.toys = []; // Initialize toys as an empty array
    }

    // Method to add a toy to the shop
    addToy(name, id, price) {
        const newToy = new Toys(name, id, price);
        this.toys.push(newToy);
    }

    // Method to get all toys in the shop
    getToys() {
        return this.toys;
    }
}


// Array to hold all shop instances
const allShops = [];

// Define the API endpoint

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
app.get('/api/shops', (req, res) => {
    res.json(allShops);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
