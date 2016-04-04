'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ProblemSchema = new mongoose.Schema({
  problem: String,
  division: String,
  longTime: String,
  sponTime: String
});

var TeamSchema = new mongoose.Schema({
  number: String,
  problems: [ProblemSchema]
});

export default mongoose.model('Team', TeamSchema);
