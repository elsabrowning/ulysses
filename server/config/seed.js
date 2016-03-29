/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Schedule from '../api/schedule/schedule.model';
import User from '../api/user/user.model';

Schedule.find({}).removeAsync()
  .then(() => {
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
          start: {
            hour: 10,
            minute: 30
          },
          end: {
            hour: 11,
            minute: 45
          }
        }]
      }],
      unassigned: []
    }, {
      name: 'Another Not Quite as Cool Odyssey Thing',
      date: new Date('June 4, 2016'),
      info: 'It should work out okay',
      jobs: [{
        name: 'Food service',
        training: 15,
        slots: [{
          assigned: [],
          positions: 9,
          start: {
            hour: 12,
            minute: 30
          },
          end: {
            hour: 14,
            minute: 45
          }
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
      email: 'live2serve@volunteers4u.com',
      password: 'helping123'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@misterbossypants.com',
      password: 'admin'
    }, {
      provider: 'local',
      role: 'organizer',
      name: 'Organizer Ollie',
      email: 'ithinkiamincharge@2ndincommand.org',
      password: 'password123'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
