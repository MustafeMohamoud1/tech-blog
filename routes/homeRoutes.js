const router = require("express").Router();
const withAuth = require("authController");

// Route to render the home page
router.get('/', withAuth, (req, res) => {
    res.render('home');
});

module.exports = router;