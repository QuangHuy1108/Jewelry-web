const express = require('express');
const router = express.Router();
const { addOrderItems } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', addOrderItems);

module.exports = router;
