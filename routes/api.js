var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.use('/api', require('./requests'));

//router.use('/api', require('./jobs'));

module.exports = router;
