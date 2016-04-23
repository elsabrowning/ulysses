'use strict';

angular.module('ulyssesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schedule.utilities', {
        url: '/utilities',
        templateUrl: 'app/schedule.utilities/schedule.utilities.html',
        controller: 'ScheduleUtilitiesCtrl'
      });
  });
