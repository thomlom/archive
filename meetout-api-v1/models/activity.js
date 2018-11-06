const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
  creator: {
    // An activity will be assigned to a user ID
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: Date,
  title: String,
  description: String
});

module.exports = mongoose.model('Activity', activitySchema);
