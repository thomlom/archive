const User = require('../models/user');

exports.me = async (req, res) => {
  const { userId } = req;
  const user = await User.findById(userId);
  return res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
};
