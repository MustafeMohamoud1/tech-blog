const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to render the login/register page
router.get('/login-register', (req, res) => {
    res.render('login-register');
});

// Route to handle user registration form submission
router.post('/register', authController.register);

// Route to handle user login form submission
router.post('/login', authController.login);

module.exports = router;
