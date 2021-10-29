const express = require('express');
const router = express.Router();


/* Registration router */
router.get('/register', (req, res) => {
    res.send('Registered');
});


/* Authenticate */
router.get('/authenticate', (req, res) => {
    res.send('Registered');
});

/* Login */
router.get('/login', (req, res) => {
    res.send('Registered');
});

/* validate */

router.get('/validate', (req, res) => {
    res.send('Registered');
});



module.exports = router;
