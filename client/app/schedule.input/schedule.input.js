'use strict';

angular.module('ulyssesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schedule.input', {
        url: '/:id/input',
        templateUrl: 'app/schedule.input/schedule.input.html',
        controller: 'ScheduleInputCtrl'
      });
  });
