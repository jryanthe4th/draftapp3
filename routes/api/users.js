const express = require('express');

const router = express.Router();

// Import our User model
const User = require('../../models/user');

// POST to /find
router.post('/find', (req, res, next) => {
  // get the requested user
  User.findOne({ username: req.body.username }, (err, user) => {
    if (req.user) {
      return res.send(JSON.stringify(req.user));
    }
    if (err) {
      return res.json({ error: err });
    }
    console.log('--user:', user);
    if (!user) {
      return res.json({ error: 'Username not found' });
    }
    const { username } = user;
    console.log('--user:', user);
    return res.json({ username });
  });
});

// GET User list
router.get('/list', (req, res, next) => {
  // find all matching users
  User.find((err, users) => {
    if (err) {
      // if something is broken, send an error
      return res.send(err);
    }
    // otherwise, send an array of users
    return res.json(users);
  });
});

module.exports = router;
