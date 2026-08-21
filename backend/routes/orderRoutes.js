const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/', auth, orderController.placeOrder);
router.get('/', auth, orderController.getOrders);

module.exports = router;