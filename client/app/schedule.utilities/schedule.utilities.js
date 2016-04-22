'use strict';

angular.module('ulyssesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schedule.utilities', {
        url: '/schedule.utilities',
        template: '<schedule-utilities></schedule-utilities>'
      });
  });
