'use strict';

angular.module('ulyssesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schedule.edit', {
        url: '/:id/edit',
        templateUrl: 'app/schedule.edit/schedule.edit.html',
        controller: 'ScheduleEditCtrl'
      });
  });
