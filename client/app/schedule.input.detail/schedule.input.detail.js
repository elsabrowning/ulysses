'use strict';

angular.module('ulyssesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schedule.input.detail', {
        url: '/:volunteer',
        templateUrl: 'app/schedule.input.detail/schedule.input.detail.html',
        controller: 'ScheduleInputDetailCtrl'
      });
  });
