'use strict';

angular.module('ulyssesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schedule.build', {
        url: '/build',
        templateUrl: 'app/schedule.build/schedule.build.html',
        controller: 'ScheduleBuildCtrl'
      });
  });
