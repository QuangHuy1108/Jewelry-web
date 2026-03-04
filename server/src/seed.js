require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const products = [
    {
        name: "Oval Cut Diamond Solitaire",
        description: "A breathtaking 2.5-carat oval cut diamond set in a minimalist platinum band, engineered to capture maximum brilliance.",
        price: 18500.00,
        category: "Rings",
        image: "https://images.unsplash.com/photo-1605100804763-247f6613d28e?auto=format&fit=crop&q=80&w=800&ar=4:5",
        imageHover: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=800&ar=4:5&q=80",
        stock: 3,
        rating: 5.0,
        numReviews: 14
    },
    {
        name: "Emerald & Diamond Riviera",
        description: "An exceptional masterpiece featuring 15 carats of vivid Colombian emeralds interspersed with brilliant white diamonds perfectly matched in color and clarity.",
        price: 24000.00,
        category: "Necklaces",
        image: "https://images.unsplash.com/photo-1599643477874-c4a6a5bc3fbc?auto=format&fit=crop&w=800&ar=4:5&q=80",
        imageHover: "https://images.unsplash.com/photo-1599643478524-fb66f7f2b184?auto=format&fit=crop&w=800&ar=4:5&q=80",
        stock: 2,
        rating: 4.9,
        numReviews: 8
    },
    {
        name: "Art Deco Sapphire Drops",
        description: "Vintage-inspired drop earrings showcasing twin royal blue sapphires surrounded by tiered pavé diamonds in 18k white gold.",
        price: 8400.00,
        category: "Earrings",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800&ar=4:5",
        imageHover: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&w=800&ar=4:5&q=80",
        stock: 5,
        rating: 4.8,
        numReviews: 19
    },
    {
        name: "VVS Diamond Tennis Bracelet",
        description: "The ultimate status symbol. A fluid line of seamlessly matched VVS clarity diamonds totaling 10 carats, crafted in pure 18k yellow gold.",
        price: 15200.00,
        category: "Bracelets",
        image: "https://images.unsplash.com/photo-1573408301145-b98fc4eab913?auto=format&fit=crop&w=800&ar=4:5&q=80",
        imageHover: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&ar=4:5&q=80",
        stock: 4,
        rating: 5.0,
        numReviews: 26
    },
    {
        name: "Luxe Obsidian Chronograph",
        description: "A masterpiece of horology featuring a brushed obsidian dial, sapphire crystal casing, and an intricate automatic movement.",
        price: 32000.00,
        category: "Watches",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&ar=4:5&q=80",
        imageHover: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&ar=4:5&q=80",
        stock: 1,
        rating: 5.0,
        numReviews: 4
    },
    {
        name: "Rare Pink Diamond Band",
        description: "A continuous sweep of exceedingly rare fancy pink diamonds set securely in an 18k rose gold eternity band.",
        price: 12500.00,
        category: "Rings",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b254a4?auto=format&fit=crop&q=80&w=800&ar=4:5",
        imageHover: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=800&ar=4:5&q=80",
        stock: 8,
        rating: 4.8,
        numReviews: 12
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
