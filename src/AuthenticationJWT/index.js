const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const port = 3006;
const secretKey = 'your_secret_key'
const authenticateToken = require('./middleware/auth.js')

// Sample user data (replace with your database or data source)
let users = []

// Middleware for parsing JSON request body
app.use(express.json())

// User registration route
app.post('/register', (req, res) => {
  const { username, password } = req.body
  // Check if username is already taken
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }
    // Save the user to the database (or in-memory array in this case)
    users.push({ username, password: hash });
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// User login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Find user by username
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  // Compare passwords
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: 'Authentication failed' });
    }
    // Generate JWT token
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  });
});

// Protected API endpoint that requires authentication
app.post('/api/post', authenticateToken, (req, res) => {
  // Access the authenticated user from req.user
  const { username } = req.user;
  res.json({ message: `Hello, ${username}! This is a protected API endpoint` });
})

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

  