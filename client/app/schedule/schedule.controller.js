'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleCtrl', function ($scope, Schedule) {
    $scope.schedules = Schedule.query();
  });
