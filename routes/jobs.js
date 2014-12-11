'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Job = mongoose.model('Job');
var Request = mongoose.model('Request');

router.get('/', function(req, res, next) {
  if (!req.user) {
    return next('must be logged in');
  }

  Job.find({fUser: req.user._id}).populate('request rUser').exec(function(err, jerbs) {
    if (err) {
      return next(err);
    }

    res.json(jerbs);
  });
});

module.exports = router;
