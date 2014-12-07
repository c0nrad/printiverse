'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
  //prints: [ {type: Schema.Types.ObjectId, ref: 'Print'}],
  //user: {type: Schema.Types.ObjectId, ref: 'User'},

  title: String,
  picture: String,
  location: String,

  price: Number,
  ts: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Request', RequestSchema);
