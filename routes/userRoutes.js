
// Route to render the login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Route to render the register page
router.get('/register', (req, res) => {
    res.render('register');
});

// Route to handle user registration form submission
router.post('/register', authController.register);

// Route to handle user login form submission
router.post('/login', authController.login);