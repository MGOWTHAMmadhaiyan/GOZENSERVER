const express = require('express')
const UserDatas = require('./Schema/model.js') // Import the Mongoose model
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// User login route
router.post('/login', async(req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserDatas.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'User Logged SuccessFully',statuscode:200 });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})
router.post('/register', async(req, res) => {
  console.log('register')
  try {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserDatas({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully',statuscode:201 });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router  
