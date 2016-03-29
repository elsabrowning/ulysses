'use strict';

angular.module('ulyssesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schedule.input', {
        url: '/input',
        templateUrl: 'app/schedule.input/schedule.input.html',
        controller: 'ScheduleInputCtrl'
      });
  });
