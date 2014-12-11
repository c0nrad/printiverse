'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
  //prints: [ {type: Schema.Types.ObjectId, ref: 'Print'}],
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  job: {type: Schema.Types.ObjectId, ref: 'Job'},

  title: String,
  picture: String,
  location: String,
  stl: String,

  price: Number,
  ts: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Request', RequestSchema);
