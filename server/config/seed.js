/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';

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
