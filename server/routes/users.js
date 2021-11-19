const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../routes/verifyToken');

/* Registration route */
router.post('/register', authController.register_post);

/* Login */
router.post('/login', authController.login_post);

// update
router.put("/:id", verifyTokenAndAuthorization, authController.updateUser);

// Delete
router.delete("/:id",verifyTokenAndAuthorization, authController.deleteUser);

// Get user
router.get("/:id", verifyTokenAndAdmin, authController.getUser);

module.exports = router;
