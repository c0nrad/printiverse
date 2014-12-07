'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema = new Schema({
  request: {type: Schema.Types.ObjectId, ref: 'Request'},
  rUser: {type: Schema.Types.ObjectId, ref: 'User'},
  fUser: {type: Schema.Types.ObjectId, ref: 'User'},
  ts: {type: Date, defualt: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);
