const bcrypt = require('bcrypt');
const { User } = require('../models');

const authController = {
  register: async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = await User.create({
        username: req.body.username,
        password: hashedPassword
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      // Retrieve the user from the database based on the provided username
      const user = await User.findOne({ where: { username: req.body.username } });
      
      // If the user is not found, return an error
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      
      // If the password is invalid, return an error
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // If the password is valid, you can consider the user authenticated
      // You may want to create a session or issue a token for authentication

      // For demonstration purposes, let's just return a success message
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = authController;

