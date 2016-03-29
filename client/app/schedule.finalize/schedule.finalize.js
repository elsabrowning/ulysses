'use strict';

angular.module('ulyssesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schedule.finalize', {
        url: '/finalize',
        templateUrl: 'app/schedule.finalize/schedule.finalize.html',
        controller: 'ScheduleFinalizeCtrl'
      });
  });
