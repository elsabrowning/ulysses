'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ScheduleSchema = new mongoose.Schema({
  name: String,
  date: Date,
  info: String,
  slots: Array
});

export default mongoose.model('Schedule', ScheduleSchema);
