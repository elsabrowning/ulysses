'use strict';

angular.module('ulyssesApp')
  .factory('Schedule', function($resource) {
    return new $resource('/api/schedules/:id');
  });
