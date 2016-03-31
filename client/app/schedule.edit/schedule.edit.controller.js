'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleEditCtrl', function ($scope, $stateParams, Schedule) {
    $scope.schedule = Schedule.get($stateParams);
  });
