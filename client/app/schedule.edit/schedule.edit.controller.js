'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleEditCtrl', function ($scope, $state, $stateParams, moment, Schedule) {
    $scope.schedule = Schedule.get($stateParams);

    $scope.assign = function(volunteer, slot) {
      var unassigned = $scope.schedule.unassigned;

      // AH, PUSH IT
      slot.assigned.push(unassigned.splice(unassigned.indexOf(volunteer), 1)[0]);
    };

    $scope.remainingPositions = function(slot) {
      return Array(slot.positions - slot.assigned.length);
    };

    $scope.save = function() {
      $scope.schedule.$save()
        .then(function() {
          $state.go('^.finalize');
        }, function() {
          console.log('An error happened / You write terrible software / Life is meaningless');
        });
    };

    $scope.timeRange = function(slot) {
      var start = moment(slot.start);
      var end = moment(slot.end);

      return start.format('h:mma') + ' to ' + end.format('h:mma');
    };

    $scope.unassign = function(volunteer, slot) {
      var assigned = slot.assigned;

      // PUSH IT REAL GOOD
      $scope.schedule.unassigned.push(assigned.splice(assigned.indexOf(volunteer), 1)[0]);
    };

  });
