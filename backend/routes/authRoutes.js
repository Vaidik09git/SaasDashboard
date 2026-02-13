const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// REGISTER ROUTE
router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password, occupation } = req.body;

    // 1. Validate required fields
    if (!name || !username || !email || !password || !occupation) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // 2. Check if user already exists
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res.status(400).json({ msg: "This user or email is already registered." });
    }

    // 3. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create User Instance
    user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      occupation
    });

    // 5. Save to MongoDB
    await user.save(); 
    
    // 6. Generate Token
    const secret = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';
    
    const token = jwt.sign(
      { id: user._id }, 
      secret, 
      { expiresIn: '24h' }
    );
    
    // 7. Return success - UPDATED to include user ID
    return res.status(201).json({ 
      token, 
      user: { 
        id: user._id, // Added ID for project linking
        name: user.name, 
        isNew: true 
      },
      msg: "Registration Successful" 
    });
  } catch (err) {
    console.error("CRITICAL REGISTER ERROR:", err); 
    res.status(500).json({ error: "Server Error: " + err.message });
  }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user in MongoDB
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: "User does not exist. Please register first." });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        // Update login timestamp
        user.lastLogin = Date.now();
        await user.save();

        // Sign Token
        const secret = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '24h' });

        // Return user data - UPDATED to include user ID
        res.json({ 
            token, 
            user: { 
                id: user._id, // Added ID for project linking
                name: user.name, 
                isNew: false 
            } 
        });
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ error: "Server Error during login" });
    }
});

module.exports = router;