'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleCtrl', function ($scope, Schedule, $stateParams) {
    $scope.schedule = Schedule.get($stateParams);
  });
