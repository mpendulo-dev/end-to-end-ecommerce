const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/* Registration route */
router.post('/register', authController.register_post);
router.get('/register', authController.register_get);

/* Login */
router.get('/login', authController.login_get);
router.post('/login', authController.register_post);


module.exports = router;
