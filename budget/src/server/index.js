const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/main');

mongoose.connect(config.database);

const app = express();
const router = express.Router();
const passportService = require('./config/passport');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(logger('dev'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const transactionRoutes = require('./routes/transaction');
const authRoutes = require('./routes/auth');

app.use('/api', transactionRoutes);
app.use('/auth', authRoutes);

app.listen(config.port);
