'use strict';

angular.module('ulyssesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schedule.edit.assign', {
        url: '/:job/:slot',
        templateUrl: 'app/schedule.edit.assign/schedule.edit.assign.html',
        controller: 'ScheduleEditAssignCtrl'
      });
  });
