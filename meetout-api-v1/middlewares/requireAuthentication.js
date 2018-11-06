const requireAuthentication = (req, res, next) =>
  req.userId
    ? next()
    : res.status(401).json({ error: 'You are not authenticated' });

module.exports = requireAuthentication;
