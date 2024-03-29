// app.js or index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Address DeprecationWarning
mongoose.set('strictQuery', false);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const port = 3017;


// Router Middleware
let routerPath=require('./route')
app.use('/api',routerPath)

// Connect to MongoDB
mongoose.connect('register mongodb uri', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB', err));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
