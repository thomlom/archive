const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../model/user');
const config = require('../config/main');
const router = new express.Router();

const generateToken = user => jwt.sign(user, config.secret, {expiresIn: 10800});
const requireAuth = passport.authenticate('jwt', {session: false});
const setUserInfo = request => ({_id: request._id, username: request.username});

router.post('/signin', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({
    username: username
  }, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({error: 'There is no such user in the database'});
    } else {
      user.validPassword(password)
        ? res.json({
          token: 'JWT ' + generateToken(setUserInfo(user)),
          username
        })
        : res.json({error: 'Invalid Password'});
    }
  });
});

router.post('/signup', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const passwordVerification = req.body.passwordVerification;
  if (!username) {
    return res.json({error: 'You must enter a valid username'});
  }
  if (!password) {
    return res.json({error: 'You must enter a valid password'});
  }
  if (!passwordVerification) {
    return res.json({error: 'You must enter a valid password verification'});
  }
  if (password !== passwordVerification) {
    return res.json({error: 'Your passwords must be the same'});
  }
  User.findOne({
    username: username
  }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.json({error: 'That username is already in use'});
    }

    let user = new User();
    user.username = username;
    user.password = user.encryptPassword(password);
    user.save(function(err, user) {
      err
        ? next(err)
        : res.json({
          token: 'JWT ' + generateToken(setUserInfo(user)),
          username: user.username
        });
    });
  });
});

module.exports = router;
