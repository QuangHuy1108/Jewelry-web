const mongoose = require('mongoose');
const Product = require('../models/Product');
const Order = require('../models/Order');

const getProducts = async (req, res) => {
    try {
        const query = {};

        // Apply material filter if exists in query parameters
        if (req.query.material) {
            const materials = req.query.material.split(',').map(m => new RegExp(`^${m.trim()}$`, 'i'));
            query.material = { $in: materials };
        }

        // Apply gemstone filter if exists in query parameters
        if (req.query.gemstone) {
            const gemstones = req.query.gemstone.split(',').map(g => new RegExp(`^${g.trim()}$`, 'i'));
            query.gemstone = { $in: gemstones };
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Product ID' });
        }
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createProduct = async (req, res) => {
    try {
        let sizes = req.body.sizes;
        if (typeof sizes === 'string') {
            try { sizes = JSON.parse(sizes); } catch (e) { sizes = sizes.split(','); }
        }

        const product = new Product({
            name: req.body.name || 'Sample Name',
            price: req.body.price || 0,
            image: req.file ? req.file.path : (req.body.image || '/images/sample.jpg'),
            category: req.body.category || 'Sample Category',
            stock: req.body.stock || 0,
            description: req.body.description || 'Sample description',
            material: req.body.material,
            gemstone: req.body.gemstone,
            sizes: sizes || []
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock, material, gemstone } = req.body;

        let sizes = req.body.sizes;
        if (typeof sizes === 'string') {
            try { sizes = JSON.parse(sizes); } catch (e) { sizes = sizes.split(','); }
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Product ID' });
        }

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price !== undefined ? price : product.price;
            product.description = description || product.description;

            // Handle image: from file upload OR fallback to sent string OR keep existing
            if (req.file) {
                product.image = req.file.path;
            } else if (req.body.image) {
                product.image = req.body.image;
            }

            product.category = category || product.category;
            product.material = material || product.material;
            product.gemstone = gemstone || product.gemstone;
            product.sizes = sizes || product.sizes;
            product.stock = stock !== undefined ? stock : product.stock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Product ID' });
        }
        const product = await Product.findById(req.params.id);

        if (product) {
            await Product.deleteOne({ _id: product._id });
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProductReview = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Product ID' });
        }

        const { rating, comment } = req.body;
        if (!rating || !comment) {
            return res.status(400).json({ message: 'Rating and comment are required' });
        }

        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            // Check if user actually purchased the product
            const hasPurchased = await Order.findOne({
                user: req.user._id,
                'orderItems.product': req.params.id,
                isPaid: true
            });

            if (!hasPurchased) {
                return res.status(403).json({ message: 'You must purchase this product before you can review it.' });
            }

            if (alreadyReviewed) {
                return res.status(400).json({ message: 'Product already reviewed' });
            }

            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

            await product.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const checkProductPurchase = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Product ID' });
        }

        const hasPurchased = await Order.findOne({
            user: req.user._id,
            'orderItems.product': req.params.id,
            isPaid: true
        });
        res.status(200).json({ hasPurchased: !!hasPurchased });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, checkProductPurchase };
