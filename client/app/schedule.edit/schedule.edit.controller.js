'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleEditCtrl', function ($scope, $stateParams, moment, Schedule) {
    $scope.schedule = Schedule.get($stateParams);

    $scope.range = function(slot) {
      var start = moment(slot.start);
      var end = moment(slot.end);

      return start.format('h:mm') + ' to ' + end.format('h:mm');
    };
  });
