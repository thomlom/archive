const jwt = require('jsonwebtoken');

const setUserId = (req, res, next) => {
  // Grab the token from the client in the axios headers
  const token = req.headers.authorization;

  if (token) {
    // decode the JWT so we can get the user ID on each request
    // JWT_SECRET will make sure no one has added values to the token
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = userId;
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  return next();
};

module.exports = setUserId;
