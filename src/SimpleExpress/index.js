// app.js or index.js
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routerPath = require('./route')

const port = 3003
;

// Router Middleware
app.use('/',routerPath)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
