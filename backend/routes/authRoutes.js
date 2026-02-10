const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/user', auth, async (req, res) => {
  try {
    // req.user is attached by the auth middleware
    const user = await User.findById(req.user).select('-password');
    
    // Logic to determine if user is 'New' (e.g., joined in last 24 hours)
    const isNew = (Date.now() - new Date(user.createdAt).getTime()) < 86400000;

    res.json({
      name: user.name,
      occupation: user.occupation,
      isNew: isNew
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// REGISTER ROUTE
router.post('/register', async (req, res) => {
  try {
    const { name, username, email, password, occupation } = req.body;

    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) return res.status(400).json({ msg: "User or Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      occupation
    });

    await user.save();
    
    // Create Token so they are logged in immediately
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { name: user.name, isNew: true } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN ROUTE (Update lastLogin)
// LOGIN ROUTE 
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user in MongoDB
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: "User does not exist" });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        // Update lastLogin in MongoDB to help determine "Welcome Back" status
        const lastLoginDate = user.lastLogin;
        user.lastLogin = Date.now();
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Send database details to frontend
        res.json({ 
            token, 
            user: { 
                name: user.name, 
                // Logic: If user was created within the last 5 minutes, treat as "New"
                isNew: (Date.now() - user.createdAt) < 300000 
            } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;