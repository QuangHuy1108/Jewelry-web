const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/Product');

const createPaymentIntent = async (req, res) => {
    try {
        const { cartItems } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'No items in cart' });
        }

        let amount = 0;
        for (const item of cartItems) {
            const product = await Product.findById(item.product);
            if (product) {
                amount += Number(product.price) * Number(item.qty);
            }
        }

        if (amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        // Create a PaymentIntent with the order amount and currency
        // Stripe expects the amount in cents (or the smallest currency unit)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Stripe error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPaymentIntent,
};
