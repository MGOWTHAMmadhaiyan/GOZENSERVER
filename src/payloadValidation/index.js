const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json())

const port = 3011;

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  id: Joi.number()
});


//Sample Payload 
// const sample={
//   "id":4,
//   "username": "Ram",
//   "email":"gowthamtanu2000@gmail.com",
//   "password":"Hello123"
// }
// console.log(sample)

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next()
};

// Route to handle POST requests for user creation
app.post('/api/users', validateUser,(req, res) => {
  // This route handler will only be called if the request payload passes validation
  res.status(201 || 200).json({ message: 'User created successfully', user: req.body });
});

app.use((err, req, res, next) => {
  if (err instanceof validationResult) {
    return res.status(400).json({ error: err.errors[0].msg });
  }
  next(err);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
