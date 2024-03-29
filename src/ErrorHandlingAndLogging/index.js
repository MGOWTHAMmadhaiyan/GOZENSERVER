const express = require('express')
const fs = require('fs')
const winston = require('winston')

const app = express();
const port = 3008;
const User = [
  {
    "id": 1,
    "name": "John"
  }
]

// Set up logging using Winston
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log' })
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});

// Middleware for parsing JSON request body
app.use(express.json());

app.get('/info', (req, res) => {
  try {

    const user =  User.find((userData)=> userData.name===req.body.name)
    //  Execute catch Block when colection or  user is undefined 
    // const anotherUser =  User.find()

    if (user) {
      logger.info( 'Logger info,User is found')
    }
  } catch (err) {
    logger.error('Error',err.message)
    res.status(500).json({ message: err.message });
  }
  res.send('Information logged successfully')
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});
