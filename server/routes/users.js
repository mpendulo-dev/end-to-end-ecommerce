const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {verifyToken, verifyTokenAndAuthorization} = require('../routes/verifyToken');

/* Registration route */
router.post('/register', authController.register_post);
router.get('/register', authController.register_get);

/* Login */
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);

// update
router.put("/:id", verifyTokenAndAuthorization, authController.updateUser);


module.exports = router;
