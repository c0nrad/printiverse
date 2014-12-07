'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
  prints: [ {type: Schema.Types.ObjectId, ref: 'Print'}],
  user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Cart', CartSchema);
