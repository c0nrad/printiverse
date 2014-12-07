'use strict';

var mongoose = require('mongoose');
var Request = mongoose.model('Request');

var express = require('express');
var router = express.Router();

router.get('/requests', function(req, res, next) {
  Request.find({}, function(err, requests) {
    if (err) {
      return next(err);
    }

    res.json(requests);
  });
});

router.post('/requests', function(req, res, next) {

  var r = new Request(req.body);
  r.save(function(err, request) {
    if (err) {
      return next(err);
    }

    res.json(request);
  });
});

module.exports = router;
