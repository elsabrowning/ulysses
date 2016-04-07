'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleEditCtrl', function ($scope, $state, $stateParams, moment, Schedule) {
    $scope.schedule = Schedule.get($stateParams);

    $scope.save = function() {
      $scope.schedule.$save()
        .then(function() {
          $state.go('schedule.finalize');
        }, function() {
          console.log('An error happened / You write terrible software / Life is meaningless');
        });
    };

    $scope.timeRange = function(slot) {
      var start = moment(slot.start);
      var end = moment(slot.end);

      return start.format('h:mma') + ' to ' + end.format('h:mma');
    };

  });
