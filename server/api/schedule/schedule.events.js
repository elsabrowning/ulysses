/**
 * Schedule model events
 */

'use strict';

import {EventEmitter} from 'events';
var Schedule = require('./schedule.model');
var ScheduleEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ScheduleEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Schedule.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ScheduleEvents.emit(event + ':' + doc._id, doc);
    ScheduleEvents.emit(event, doc);
  }
}

export default ScheduleEvents;
