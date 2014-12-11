'use strict';

var mongoose = require('mongoose');
var Request = mongoose.model('Request');
var Job = mongoose.model('Job');

var express = require('express');
var router = express.Router();

var async=  require('async');
var _ = require('underscore');

router.get('/', function(req, res, next) {
  Request.find({}, function(err, requests) {
    if (err) {
      return next(err);
    }

    res.json(requests);
  });
});

router.get('/me', function(req, res, next) {
  if (!req.user) {
    return next('must be logged in');
  }

  console.log(req.user._id);
  Request.find({user: req.user._id}, function(err, requests) {
    if (err) {
      return next(err);
    }

    res.json(requests);
  });
});

router.post('/:id/reserve', function(req, res, next) {
  if (!req.user) {
    return next('must be logged in');
  }

  async.auto({
    request: function(next) {
      Request.findById(req.params.id, next);
    },

    job: ['request', function(next, results) {
      var request = results.request;
      var j = new Job();
      j.rUser = request.user;
      j.fUser = req.user._id;
      j.request = request._id;
      j.save(next);
    }],

    reserverRequest: ['request', 'job', function(next, results) {
      var request = results.request;
      var job = results.job[0];

      request.job = job._id;
      request.save(next);
    }],
  }, function(err, results) {
    if (err) {
      return next(err);
    }

    res.json(results.request);
  });
});

router.post('/', function(req, res, next) {
  if (!req.user) {
    return next('must be logged in');
  }

  var params = _.pick(req.body, 'title', 'picture', 'location', 'price', 'stl', 'shipping', 'cc', 'billing');
  params.user = req.user._id;

  var r = new Request(params);
  r.save(function(err, request) {
    if (err) {
      return next(err);
    }

    res.json(request);
  });
});

module.exports = router;
