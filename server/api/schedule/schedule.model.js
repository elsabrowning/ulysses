'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var VolunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String,
  childTeam: String,
  constraints: Array,
  comments: String,
  shirt: String,
  positions: Array,
  preferences: Array
});

var SlotSchema = new mongoose.Schema({
  assigned: [VolunteerSchema],
  positions: Number,
  start: Date,
  end: Date
});

var JobSchema = new mongoose.Schema({
  name: String,
  training: Number,
  slots: [SlotSchema]
});

var ProblemSchema = new mongoose.Schema({
  problem: String,
  division: String,
  longterm: String,
  spontaneous: String
});

var TeamSchema = new mongoose.Schema({
  number: String,
  problems: [ProblemSchema]
});

var ScheduleSchema = new mongoose.Schema({
  name: String,
  date: Date,
  info: String,
  jobs: [JobSchema],
  teams: [TeamSchema],
  unassigned: [VolunteerSchema]
});

export default mongoose.model('Schedule', ScheduleSchema);
