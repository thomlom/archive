require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

// Custom middlewares
const setUserId = require('./middlewares/setUserId');
const requireAuthentication = require('./middlewares/requireAuthentication');

// Controllers import
const { register, login } = require('./controllers/authentication');
const { me } = require('./controllers/user');
const {
  createActivity,
  getAllActivities,
  getActivity
} = require('./controllers/activity');

// The use of useNewUrlParser is just for removing the warning in the console
mongoose.connect(
  process.env.MLAB_URI,
  { useNewUrlParser: true }
);

const app = express();

/**
 * Set various HTTP headers to help protect the app
 * @see https://helmetjs.github.io/
 */
app.use(helmet());

/**
 * Configuring CORS w/ Dynamic Origin in production
 */
if (process.env.NODE_ENV === 'production') {
  const whitelist = ['http://localhost:3000', 'https://meetout.now.sh'];
  const corsOptions = {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        // Continue if the origin is in the whitelist
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  };
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Support cookies
app.use(cookieParser());

// Log every requests only if the environment is not related to testing
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'));
}

// Use custom middlewares
app.use(setUserId);

// Test if API is working
app.get('/', (req, res) => res.send('Hello World'));

// Authentication
app.post('/register', register);
app.post('/login', login);
app.get('/me', requireAuthentication, me);

// Activity
app.get('/activities', requireAuthentication, getAllActivities);
app.get('/activity/:activityId', requireAuthentication, getActivity);
app.post('/activity/create', requireAuthentication, createActivity);

module.exports = app;
