
const express = require('express');
const router = express.Router();
const { checkIn, checkOut ,getMonthlyReport} = require('../controllers/controller');
const { authenticateToken,authenticateAdmin } = require('../middleware/auth');

const { register, login} = require('../controllers/userController');

//user routes
router.post('/register', register);
router.post('/login', login);


router.get('/monthly-report', getMonthlyReport);
router.post('/checkin',authenticateToken, checkIn);
router.post('/checkout',authenticateToken, checkOut);

module.exports = router;
