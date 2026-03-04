const express = require('express');
const router = express.Router();
const { createPaymentIntent } = require('../controllers/paymentController');

// @route   POST /api/payments/create-payment-intent
// @desc    Create Stripe Payment Intent
// @access  Public (in practice, might want to protect this behind auth depending on architecture, but often public for guests)
router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;
