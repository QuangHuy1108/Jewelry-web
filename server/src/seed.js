require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const products = [
    {
        name: "Diamond Solitaire Ring",
        description: "A stunning 1-carat diamond solitaire ring set in 18k white gold.",
        price: 1299.99,
        category: "Rings",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b254a4?auto=format&fit=crop&q=80&w=800",
        stock: 15,
        rating: 4.8,
        numReviews: 24
    },
    {
        name: "Sapphire Pendant Necklace",
        description: "Elegant deep blue sapphire pendant surrounded by a halo of brilliant diamonds.",
        price: 850.00,
        category: "Necklaces",
        image: "https://images.unsplash.com/photo-1599643478524-fb66fa5320e4?auto=format&fit=crop&q=80&w=800",
        stock: 10,
        rating: 4.9,
        numReviews: 12
    },
    {
        name: "Vintage Pearl Earrings",
        description: "Classic cultured pearl drop earrings with intricate vintage gold detailing.",
        price: 450.00,
        category: "Earrings",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
        stock: 20,
        rating: 4.7,
        numReviews: 38
    },
    {
        name: "Gold Tennis Bracelet",
        description: "A sparkling 14k yellow gold tennis bracelet featuring premium cubic zirconia.",
        price: 599.99,
        category: "Bracelets",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
        stock: 8,
        rating: 4.6,
        numReviews: 15
    },
    {
        name: "Emerald Cut Engagement Ring",
        description: "Breathtaking emerald-cut diamond engagement ring in a platinum setting.",
        price: 3499.00,
        category: "Rings",
        image: "https://images.unsplash.com/photo-1622398553648-52264eb789b5?auto=format&fit=crop&q=80&w=800",
        stock: 3,
        rating: 5.0,
        numReviews: 7
    },
    {
        name: "Silver Charm Bracelet",
        description: "Sterling silver charm bracelet with a secure heart-shaped clasp.",
        price: 120.00,
        category: "Bracelets",
        image: "https://images.unsplash.com/photo-1573408301145-b98c50d53629?auto=format&fit=crop&q=80&w=800",
        stock: 25,
        rating: 4.5,
        numReviews: 60
    }
];

const seedDB = async () => {
    try {
        await connectDB();
        
        console.log('Clearing existing products...');
        await Product.deleteMany();
        
        console.log('Inserting sample products...');
        await Product.insertMany(products);
        
        console.log('Data Successfully Seeded!');
        process.exit();
    } catch (error) {
        console.error(`Error with data import: ${error.message}`);
        process.exit(1);
    }
};

seedDB();
