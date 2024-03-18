const router = require("express").Router();

// Route to render the home page
router.get('/home', (req, res) => {
    res.render('home');
});

module.exports = router;
