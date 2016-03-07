'use strict';

angular.module('ulyssesApp')
  .factory('Schedule', function($resource) {
    var Schedule = new $resource('/api/schedules/:id', null, {
      create: {
        method: 'POST'
      },
      update: {
        method: 'PUT',
        params: {
          id: '@_id'
        }
      }
    });

    Schedule.prototype.$save = function() {
      if (!this._id) {
        return this.$create();
      }
      else {
        return this.$update();
      }
    };

    return Schedule;
  });
