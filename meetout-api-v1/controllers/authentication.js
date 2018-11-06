const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing informations' });
  }

  // make sure the user doesn't make errors with mixed-case letters
  const lowerCasedEmail = email.toLowerCase();

  // check if a user already exists
  const potentialUser = await User.findOne({ email: lowerCasedEmail });
  if (potentialUser) {
    return res.status(400).json({ error: 'The user already exists' });
  }

  // hash their password so that nobody can access the password
  // A salt makes the generation unique so that two hashes of the same password can't give the same result
  const hashedPassword = await bcrypt.hash(password, 10);

  let user = new User({
    email: lowerCasedEmail,
    password: hashedPassword,
    name
  });

  user = await user.save();

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing informations' });
  }

  const lowerCasedEmail = email.toLowerCase();

  // check if there is a user with that email
  const user = await User.findOne({ email: lowerCasedEmail });

  if (!user) {
    return res
      .status(404)
      .json({ error: `No such user found for email ${email}` });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ error: 'Invalid password!' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email }
  });
};
