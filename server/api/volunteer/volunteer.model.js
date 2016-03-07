'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var VolunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String,
  constraints: Array,
  comments: String,
  shirt: String,
  positions: Array,
  preferences: Array
});

export default mongoose.model('Volunteer', VolunteerSchema);
