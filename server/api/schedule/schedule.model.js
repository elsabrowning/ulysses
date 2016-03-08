'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ScheduleSchema = new mongoose.Schema({
  name: String,
  date: Date,
  info: String,
  slots: [new mongoose.Schema({
    category: String,
    volunteers: Number,
    start: {
      hour: Number,
      minute: Number
    },
    end: {
      hour: Number,
      minute: Number
    }
  },
  {
    _id: false
  })],
  volunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer'
  }]
});

export default mongoose.model('Schedule', ScheduleSchema);
