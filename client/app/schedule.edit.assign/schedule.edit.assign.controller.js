'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleEditAssignCtrl', function ($scope, $state, $stateParams) {
    $scope.schedule = null;
    $scope.job = null;
    $scope.slot = null;

    $scope.$parent.$parent.schedule.$promise.then(function(schedule) {
      $scope.schedule = schedule;

      // This is horrible, but whatever:

      $scope.schedule.jobs.forEach(function(job) {
        if (job._id == $stateParams.job) {
          $scope.job = job;
        }
      });

      $scope.job.slots.forEach(function(slot) {
        if (slot._id == $stateParams.slot) {
          $scope.slot = slot;
        }
      });
    });

/*    $scope.getJobName = function(slot) {
      $scope.schedule.jobs.forEach(function(job) {
        if (job._id == $stateParams.job) {
          $scope.job = job;
        }
      });
    }; */

    $scope.assign = function(volunteer, slot) {
      var unassigned = $scope.schedule.unassigned;

      // AH, PUSH IT
      slot.assigned.push(unassigned.splice(unassigned.indexOf(volunteer), 1)[0]);
      volunteer.constraints.push({start: slot.start, end: slot.end, name: $scope.job.name});
    };

    $scope.remainingPositions = function(slot) {
      var remaining = slot.positions - slot.assigned.length;
      return Array(remaining < 0 ? 0 : remaining);
    };

    $scope.unassign = function(volunteer, slot) {
      var assigned = slot.assigned;
      console.log(volunteer.constraints.length);
      // PUSH IT REAL GOOD
      $scope.schedule.unassigned.push(assigned.splice(assigned.indexOf(volunteer), 1)[0]);
      for(var i = 0; i < volunteer.constraints.length; i++) {
        if(volunteer.constraints[i].name != "Watching Performance") {
          volunteer.constraints.splice(0, i);
          console.log(volunteer.constraints.length);
        }

      }

    };
  });
