const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Step 2: Hashing tool
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Step 1: Import the Model

// REGISTER ROUTE
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Step 2: Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Step 3: Prepare the new User object
    user = new User({
      username,
      password: hashedPassword // Save the hashed version, not plain text
    });

    // Step 4: Save Command
    await user.save(); // Pushes data to your 'login' database in MongoDB

    res.json({ msg: "User registered successfully in 'login' database!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;