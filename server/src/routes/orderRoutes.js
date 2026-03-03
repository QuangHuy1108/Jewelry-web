const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders } = require('../controllers/orderController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

router.post('/', optionalAuth, addOrderItems);
router.get('/myorders', protect, getMyOrders);

module.exports = router;
