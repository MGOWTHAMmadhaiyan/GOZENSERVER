// authMiddleware.js

const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'

// Define the authenticateToken function
function authenticateToken(req, res, next) {
  // Extract the JWT token from the request headers
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  const tokenExpire = isTokenExpired(token)
  // Check if token is not provided
  if (!token || tokenExpire) {
    return res.sendStatus(401); // Unauthorized
  } else {

  // Verify the token
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next(); // Proceed to the next middleware
  })
  }

}

// Function to check if a JWT token has expired
function isTokenExpired(token) {
  try {
    // Decode the token (without verifying its signature)
    const decodedToken = jwt.decode(token);

    // Check if the decoded token contains an expiration time
    if (decodedToken && typeof decodedToken.exp !== 'undefined') {
      // Retrieve the expiration time (exp) claim from the decoded token
      const expirationTime = decodedToken.exp;

      // Get the current time (in seconds since Unix Epoch)
      const currentTime = Math.floor(Date.now() / 1000);
      // Compare the expiration time with the current time
      if (expirationTime < currentTime) {
        // Token has expired
        return true;
      }
    }

    // Token is not expired
    return false;
  } catch (error) {
    // Error occurred while decoding the token
    console.error('Error decoding token:', error);
    return true; // Treat as expired to be safe
  }
}

// Export the authenticateToken function
module.exports = authenticateToken;
