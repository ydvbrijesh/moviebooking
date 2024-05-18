const express = require('express');
const router = express.Router();
const users = require('../controllers/user.controller.js');

// User authentication routes
router.post('/auth/signup', users.signUp);
router.post('/auth/login', users.login);
router.post('/auth/logout', users.logout); 
router.post('/bookShow ', users.bookShow);
router.get('/getCouponCode ', users.getCoupons);

module.exports = router;
