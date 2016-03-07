'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ScheduleSchema = new mongoose.Schema({
  name: String,
  date: Date,
  info: String,
  slots: Array,
  volunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer'
  }]
});

export default mongoose.model('Schedule', ScheduleSchema);
