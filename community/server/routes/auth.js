import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/user';
import config from '../config';

const router = new express.Router();

const generateToken = (user) => jwt.sign(user, config.secret);

export const setUserInfo = (user) => ({
  id: user.id,
  username: user.username
});

router.post('/decodeToken', (req, res, next) => {
  if (req.body.token) {
    const {
      id
    } = jwt.decode(req.body.token);
    User.findById(id, (err, foundUser) => {
      if (err) return next(err);
      return res.json(setUserInfo(foundUser));
    });
  }
});

router.post('/signin', (req, res, next) => {
  const username = req.body.username.trim().toLowerCase();
  const password = req.body.password.trim();
  if (!username) {
    return res.json({
      error: `Required field`,
      field: 'username'
    });
  }
  if (!password) {
    return res.json({
      error: `Required field`,
      field: 'password'
    });
  }
  User.findOne({
    username
  }, (err, user) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.json({
        error: `No user was found`,
        field: 'username'
      });
    } else {
      let token = generateToken(setUserInfo(user));
      return user.validPassword(password) ?
        res.json({
          token,
          user: jwt.decode(token)
        }) :
        res.json({
          error: 'Wrong password',
          field: 'password'
        });
    }
  });
});

router.post('/signup', function (req, res, next) {
  const username = req.body.username.trim().toLowerCase();
  const password = req.body.password.trim();
  const passwordVerification = req.body.passwordVerification.trim();
  if (!username) {
    return res.json({
      error: `Required field`,
      field: 'username'
    });
  }
  if (!password) {
    return res.json({
      error: `Required field`,
      field: 'password'
    });
  }
  if (!passwordVerification) {
    return res.json({
      error: `Required field`,
      field: 'passwordVerification'
    });
  }
  if (password !== passwordVerification) {
    return res.json({
      error: 'Passwords are different',
      field: 'passwordVerification'
    });
  }
  User.findOne({
    username: username
  }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.json({
        error: `Username not available`,
        field: 'username'
      });
    }
    let user = new User({
      username,
      password
    });
    user.save((err, user) => {
      if (err) {
        return next(err);
      }
      let token = generateToken(setUserInfo(user));
      return res.json({
        token,
        user: jwt.decode(token)
      });
    });
  });
});

export default router;