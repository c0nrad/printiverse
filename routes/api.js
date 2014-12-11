var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.use('/api/requests', require('./requests'));
router.use('/api/users', require('./users'));
router.use('/api/jobs', require('./jobs'));

//router.use('/api', require('./jobs'));

module.exports = router;
