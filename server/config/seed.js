/**
* Populate DB with sample data on server start
* to disable, edit config/environment/index.js, and set `seedDB: false`
*/

'use strict';
import Schedule from '../api/schedule/schedule.model';
import User from '../api/user/user.model';

Schedule.find({}).removeAsync().then(() => {
  Schedule.createAsync({
    name: 'Some Cool Odyssey Thing',
    date: new Date('April 1, 2016'),
    info: 'It will be totally wicked.',
    jobs: [{
      name: 'Food service',
      training: 15,
      slots: [{
        assigned: [],
        positions: 4,
        start: new Date('April 1, 2016, 10:00:00'),
        end: new Date('April 1, 2016, 11:00:00')
      }, {
        assigned: [],
        positions: 4,
        start:new Date('April 1, 2016, 11:00:00'),
        end: new Date('April 1, 2016, 12:00:00')
      }, {
        assigned: [],
        positions: 4,
        start:new Date('April 1, 2016, 12:00:00'),
        end: new Date('April 1, 2016, 13:00:00')
      }, {
        assigned: [],
        positions: 4,
        start:new Date('April 1, 2016, 13:00:00'),
        end: new Date('April 1, 2016, 14:00:00')
      }, {
        assigned: [],
        positions: 4,
        start:new Date('April 1, 2016, 14:00:00'),
        end: new Date('April 1, 2016, 15:00:00')
      }, {
        assigned: [],
        positions: 4,
        start:new Date('April 1, 2016, 16:00:00'),
        end: new Date('April 1, 2016, 17:00:00')
      }]
    }, {
      name: 'Blue House Doorkeeper',
      training: 15,
      slots: [{
        assigned: [],
        positions: 1,
        start: new Date('April 1, 2016, 10:00:00'),
        end: new Date('April 1, 2016, 11:00:00')
      }, {
        assigned: [],
        positions: 1,
        start:new Date('April 1, 2016, 11:00:00'),
        end: new Date('April 1, 2016, 12:00:00')
      }, {
        assigned: [],
        positions: 1,
        start:new Date('April 1, 2016, 12:00:00'),
        end: new Date('April 1, 2016, 13:00:00')
      }, {
        assigned: [],
        positions: 1,
        start:new Date('April 1, 2016, 13:00:00'),
        end: new Date('April 1, 2016, 14:00:00')
      }, {
        assigned: [],
        positions: 1,
        start:new Date('April 1, 2016, 14:00:00'),
        end: new Date('April 1, 2016, 15:00:00')
      }, {
        assigned: [],
        positions: 1,
        start:new Date('April 1, 2016, 15:00:00'),
        end: new Date('April 1, 2016, 16:00:00')
      }, {
        assigned: [],
        positions: 1,
        start:new Date('April 1, 2016, 16:00:00'),
        end: new Date('April 1, 2016, 17:00:00')
      }]
    }, {
      name: 'Gym Doorkeeper',
      training: 15,
      slots: [{
        assigned: [],
        positions: 1,
        start: new Date('April 1, 2016, 10:00:00'),
        end: new Date('April 1, 2016, 11:00:00')
      }, {
        assigned: [],
        positions: 1,
        start:new Date('April 1, 2016, 11:00:00'),
        end: new Date('April 1, 2016, 12:00:00')
      }, {
        assigned: [],
        positions: 1,
        start:new Date('April 1, 2016, 12:00:00'),
        end: new Date('April 1, 2016, 13:00:00')
      }, {
        assigned: [],
        positions: 1,
        start:new Date('April 1, 2016, 13:00:00'),
        end: new Date('April 1, 2016, 14:00:00')
      }, {
        assigned: [],
        positions: 1,
        start:new Date('April 1, 2016, 14:00:00'),
        end: new Date('April 1, 2016, 15:00:00')
      }, {
        assigned: [],
        positions: 1,
        start:new Date('April 1, 2016, 15:00:00'),
        end: new Date('April 1, 2016, 16:00:00')
      }, {
        assigned: [],
        positions: 1,
        start:new Date('April 1, 2016, 16:00:00'),
        end: new Date('April 1, 2016, 17:00:00')
      }]
    }, {
      name: 'Spontaneous check-in',
      training: 15,
      slots: [{
        assigned: [],
        positions: 2,
        start: new Date('April 1, 2016, 10:00:00'),
        end: new Date('April 1, 2016, 12:00:00')
      }, {
        assigned: [],
        positions: 2,
        start:new Date('April 1, 2016, 12:00:00'),
        end: new Date('April 1, 2016, 14:00:00')
      }, {
        assigned: [],
        positions: 2,
        start:new Date('April 1, 2016, 14:00:00'),
        end: new Date('April 1, 2016, 16:00:00')
      }, {
        assigned: [],
        positions: 1,
        start:new Date('April 1, 2016, 16:00:00'),
        end: new Date('April 1, 2016, 17:00:00')
      }]
    }, {
      name: 'Some Judge Job',
      training: 15,
      isJudging: true,
      slots: [{
        assigned: [],
        positions: 20,
        start: new Date('April 1, 2016, 10:00:00'),
        end: new Date('April 1, 2016, 12:00:00')
      }, {
        assigned: [],
        positions: 10,
        start:new Date('April 1, 2016, 12:00:00'),
        end: new Date('April 1, 2016, 14:00:00')
      }, {
        assigned: [],
        positions: 10,
        start:new Date('April 1, 2016, 14:00:00'),
        end: new Date('April 1, 2016, 16:00:00')
      }, {
        assigned: [],
        positions: 10,
        start:new Date('April 1, 2016, 16:00:00'),
        end: new Date('April 1, 2016, 17:00:00')
      }]
    }],
    unassigned: []
  }, {
    name: 'Automatically Scheduled Tournament',
    date: new Date('April 1, 2016'),
    info: 'It will be totally wicked.',
    jobs: [{
      name: 'Concession Stand',
      training: 15,
      slots: [{
        assigned: [],
        positions: 4,
        start: new Date('April 1, 2016, 10:00:00'),
        end: new Date('April 1, 2016, 11:00:00')
      }, {
        assigned: [],
        positions: 4,
        start:new Date('April 1, 2016, 11:00:00'),
        end: new Date('April 1, 2016, 12:00:00')
      }, {
        assigned: [],
        positions: 4,
        start:new Date('April 1, 2016, 12:00:00'),
        end: new Date('April 1, 2016, 13:00:00')
      }, {
        assigned: [],
        positions: 4,
        start:new Date('April 1, 2016, 13:00:00'),
        end: new Date('April 1, 2016, 14:00:00')
      }, {
        assigned: [],
        positions: 4,
        start:new Date('April 1, 2016, 14:00:00'),
        end: new Date('April 1, 2016, 15:00:00')
      }, {
        assigned: [],
        positions: 4,
        start:new Date('April 1, 2016, 15:00:00'),
        end: new Date('April 1, 2016, 16:00:00')
      }, {
        assigned: [],
        positions: 4,
        start:new Date('April 1, 2016, 16:00:00'),
        end: new Date('April 1, 2016, 17:00:00')
      }]
    }],
    unassigned: []
  })
  .then(() => {
    console.log('finished populating schedules');
  });
});

User.find({}).removeAsync()
.then(() => {
  User.createAsync({
    provider: 'local',
    role: 'volunteer',
    name: 'Volunteer Vicki',
    email: 'volunteer@example.com',
    password: 'volunteer'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin'
  }, {
    provider: 'local',
    role: 'organizer',
    name: 'Organizer Ollie',
    email: 'organizer@example.com',
    password: 'organizer'
  })
  .then(() => {
    console.log('finished populating users');
  });
});
