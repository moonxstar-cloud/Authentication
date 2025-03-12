const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const bcrypt = require('bcryptjs');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }


    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, message: 'You are successfully registered!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token, user: { name: user.name, email: user.email , message: 'You are successfully logged in!'} });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Dashboard (protected route)
router.get('/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch or update logged-in user's data
router
  .route('/me')
  .get(auth, async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })
  .put(auth, upload.single('profile'), async (req, res) => {
    try {
      const { name, email, oldPassword, newPassword } = req.body;
      const user = await User.findById(req.userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Update name if provided
      if (name) {
        user.name = name;
      }

      // Update email if provided
      if (email) {
        user.email = email;
      }

      // Update profile picture if provided
      if (req.file) {
        user.profilePicture = req.file.path;
      }

      // Update password if provided
      if (oldPassword && newPassword) {
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ error: 'Old password is incorrect' });
        }
        user.password = newPassword;
      }

      await user.save();
      res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router;