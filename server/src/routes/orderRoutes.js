const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders, getAllOrders } = require('../controllers/orderController');
const { protect, admin, optionalAuth } = require('../middleware/authMiddleware');

router.post('/', optionalAuth, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.get('/', protect, admin, getAllOrders);

module.exports = router;
