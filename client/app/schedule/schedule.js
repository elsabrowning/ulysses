'use strict';

angular.module('ulyssesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schedule', {
        url: '/schedule/:id',
        templateUrl: 'app/schedule/schedule.html',
        controller: 'ScheduleCtrl'
      });
  });
