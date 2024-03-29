const express = require('express')

const router = express.Router()
let Users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ];

router.get('/userget', (req, res) => {
  res.json(Users);
});

// GET user by ID
router.get('/userget/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = Users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// POST create a new user
router.post('/userpost', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  const id = Users.length + 1;
  const newUser = { id, name };
  Users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router  




