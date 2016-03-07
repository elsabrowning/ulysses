'use strict';

angular.module('ulyssesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schedule.build', {
        url: '/:id/build',
        templateUrl: 'app/schedule.build/schedule.build.html',
        controller: 'ScheduleBuildCtrl'
      });
  });
