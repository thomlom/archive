const Activity = require('../models/activity');

exports.getAllActivities = async (req, res) => {
  const allActivities = await Activity.find({});
  return res.json(allActivities);
};

exports.getActivity = async (req, res) => {
  const { activityId } = req.params;
  const activity = await Activity.findById(activityId);
  return res.json(activity);
};

exports.createActivity = async (req, res) => {
  const { userId } = req;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Missing informations' });
  }

  let activity = new Activity({
    creator: userId,
    title,
    description,
    date: Date.now()
  });

  activity = await activity.save();

  return res.json(activity);
};
