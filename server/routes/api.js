var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportGithub = require('../auth/github');

var User = require('../models/user.js');


router.post('/register', function(req, res) {
  User.register(new User({ 
      username: req.body.username,
      isAdmin: false,
      private: false 
    }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

router.get('/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    status: true
  });
});

router.get('/all-users', function(req, res) {
  User.find({}, '-_id username images', function(err, users) {
    if (err) {
      res.send(err)
    }
    res.send(users);  
  });
})


// settings routes
router.get('/settings/get-privacy', function (req, res) {
  if (req.user) {
      User.findById(req.user, function (err, user) {
      if (err) console.log(err);
      res.send({
        username: req.user.username,
        private: user.private
      })  
    })
  } else {
    res.send('no such user')
  }
})

module.exports = router;