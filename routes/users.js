'use strict';

var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/me', function(req, res, next) {
  return res.json(req.user || {});
});

router.put('/:id', function(req, res, next) {
  if (!req.user) {
    return next('must be logged in');
  }

  delete req.body._id;
  User.findByIdAndUpdate(req.user._id, req.body).exec(function(err, user) {
    if (err) {
      return next(err);
    }

    res.json(user);
  });
});

router.post('/login', passport.authenticate('local-login', { failureRedirect: '/#/login' }),
function(req, res) {
  res.redirect('/#/');
});
router.post('/register', passport.authenticate('local-signup', {
  successRedirect : '/#/', // redirect to the secure profile section
  failureRedirect : '/#/register', // redirect back to the signup page if there is an error
}));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

passport.use('local-login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, email, password, done) { // callback with email and password from our form
  console.log(email, password);
  User.findOne({ 'email' :  email }, function(err, user) {
    console.log(err, user);
    if (err)
      return done(err);

    if (!user)
      return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

      if (!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
        return done(null, user);
      });

    }));


passport.use('local-signup', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
}, function(req, email, password, done) {
  process.nextTick(function() {
    User.findOne({ 'email' :  email }, function(err, user) {
      if (err) {
        return done(err);
      }

      if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
      } else {

        var newUser      = new User();

        newUser.username = req.body.username;
        newUser.email    = email;
        newUser.password = newUser.generateHash(password);

        newUser.save(function(err) {
          if (err)
            throw err;
            return done(null, newUser);
          });
        }
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = router;
