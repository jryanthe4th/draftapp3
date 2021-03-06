const appConfig = require('../../config.js');
const crypto = require('crypto');
const createDOMPurify = require('dompurify');
const express = require('express');
const { JSDOM } = require('jsdom');
const mailgun = require('mailgun-js')({
  apiKey: appConfig.mailgun.apiKey,
  domain: appConfig.mailgun.domain,
});
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/user.js');

const router = express.Router();

// Configure mongoose promises
mongoose.Promise = global.Promise;

// GET to /checksession
router.get('/checksession', (req, res) => {
  if (req.user) {
  return res.send(JSON.stringify(req.user));
  }
  return res.send(JSON.stringify({}));
});

// GET to /signout
router.get('/signout', (req, res) => {
  req.logout();
  return res.send(JSON.stringify(req.user));
});

// POST to /signin
router.post('/signin', async (req, res) => {
  // look up the user by their email
  const query = User.findOne({ email: req.body.email });
  const foundUser = await query.exec();

  // if they exist, they will have a username, so add that to our body
  if (foundUser) { req.body.username = foundUser.username; }

  passport.authenticate('local')(req, res, () => {
  // if signed in, we should have user info to send back
  if (req.user) {
    return res.send(JSON.stringify(req.user));
  }

  // otherwise, return an error
  return res.send(JSON.stringify({ error: 'There was an error signing in' }));
  });
});

// POST to /register
router.post('/register', async (req, res) => {
  // first, check and make sure the email does not already exist
  const query = User.findOne({ email: req.body.email });
  const foundUser = await query.exec();

  if (foundUser) { return res.send(JSON.stringify({ error: 'Email or username already exists' })); }
  // create a user object to save, using values from incoming JSON
  if (!foundUser) {
  // sanitize the data
  const window = (new JSDOM('')).window;
  const DOMPurify = createDOMPurify(window);
  const sanitizeBody = {
    email: DOMPurify.sanitize(req.body.email),
    username: DOMPurify.sanitize(req.body.username),
    firstName: DOMPurify.sanitize(req.body.firstName),
    lastName: DOMPurify.sanitize(req.body.lastName),
    password: req.body.password,
  };

  const newUser = new User(sanitizeBody);

  // save the User, via passport's 'register' method
  return User.register(newUser, req.body.password, (err) => {
    // if there's a problem, send back JSON object with the error
    if (err) {
    return res.send(JSON.stringify({ error: err.message }));
    }
    // otherwise, sign them in
    return passport.authenticate('local')(req, res, () => {
    // if signed in, we should have User info to send back
    if (req.user) {
      return res.send(JSON.stringify(req.user));
    }
    // otherwise, return an error
    return res.send(JSON.stringify({ error: 'There was an error registering the user' }));
    });
  });
  }

  // Return an error if all else fails
  return res.send(JSON.stringify({ error: 'There was an error registering the user' }));
});

// POST to savepassword
router.post('/savepassword', async (req, res) => {
  let result;
  try {
  // look up user in the DB based on reset hash
  const query = User.findOne({ passwordReset: req.body.hash });
  const foundUser = await query.exec();

  // if the user exists, save their new password
  if (foundUser) {
    // use passport's built in password set method
    foundUser.setPassword(req.body.password, (err) => {
    if (err) {
      result = res.send(JSON.stringify({ error: 'Password could not be saved. Please try again' }));
    } else {
      // once the password is set, save the user object
      foundUser.save((error) => {
      if (error) {
        result = res.send(JSON.stringify({ error: 'Password could not be saved. Please try again' }));
      } else {
        // send a success message
        result = res.send(JSON.stringify({ success: true }));
      }
      });
    }
    });
  } else {
    result = res.send(JSON.stringify({ error: 'Reset hash not found in database' }));
  }
  } catch (err) {
  result = res.send(JSON.stringify({ error: 'There was an error connecting to the database' }));
  }
  return result;
});

// POST to saveresethash
router.post('/saveresethash', async (req, res) => {
  let result;
  try {
  // check and make sure the email exists
  const query = User.findOne({ email: req.body.email });
  const foundUser = await query.exec();

  // if the user exists, save their password hash
  const timeInMs = Date.now();
  const hashString = `${req.body.email}${timeInMs}`;
  const secret = appConfig.crypto.secret;
  const hash = crypto.createHmac('sha256', secret)
    .update(hashString)
    .digest('hex');
  foundUser.passwordReset = hash;

  foundUser.save((err) => {
    if (err) { result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to reset your password. Please Try again' })); }

    // Put together the email
    const emailData = {
    from: `DynastyDraftBoard <postmaster@${appConfig.mailgun.domain}>`,
    to: foundUser.email,
    subject: 'Reset Your Password',
    text: `A password reset has been requested for the DynastyDraftBoard account connected to this email address. If you made this request, please click the following link: https://dynastydraftboard.com/account/change-password/${foundUser.passwordReset} ... if you didn't make this request, feel free to ignore it!`,
    html: `<p>A password reset has been requested for the DynastyDraftBoard account connected to this email address. If you made this request, please click the following link: <a href='https://dynastydraftboard.com/account/change-password/${foundUser.passwordReset}' target='_blank'>https://dynastydraftboard.com/account/change-password/${foundUser.passwordReset}</a>.</p><p>If you didn't make this request, feel free to ignore it!</p>`,
    };

    // Send it
    mailgun.messages().send(emailData, (error, body) => {
    if (error || !body) {
      result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to send the email. Please try again.' }));
    } else {
      result = res.send(JSON.stringify({ success: true }));
    }
    });
  });
  } catch (err) {
  // if the user doesn't exist, error out
  result = res.send(JSON.stringify({ error: 'Something went wrong while attempting to reset your password. Please Try again' }));
  }
  return result;
});

module.exports = router;
