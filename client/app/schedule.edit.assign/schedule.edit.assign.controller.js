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

    //checks to see if two time slots overlap
    self.isConflict = function(slot1, slot2) {
      var start1 = parseInt(slot1.start);
      var end1 = parseInt(slot1.end);
      var start2 = parseInt(slot2.start);
      var end2 = parseInt(slot2.end);
      if((start1 <= start2 && start2 <= end1)) {
        console.log("scenario1");
        return true;
      }
      else if(start2 <= start1 && start1 <= end2) {
        console.log("scenario2");
        return true;
      }
      else if(start1 == start2 && end1 == end2)
      {
        console.log("scenario3");
        return true;
      } else {
        console.log("scenario4");
        return false;
      }
    }

    $scope.assign = function(volunteer, slot) {
      console.log("before assignment: " + volunteer.constraints.length);
      var unassigned = $scope.schedule.unassigned;

      // AH, PUSH IT
      slot.assigned.push(unassigned.splice(unassigned.indexOf(volunteer), 1)[0]);
      volunteer.constraints.push({start: slot.start, end: slot.end, name: $scope.job.name});
    };

    $scope.remainingPositions = function(slot) {
      var remaining = slot.positions - slot.assigned.length;
      return Array(remaining < 0 ? 0 : remaining);
    };

    $scope.timeStart = function(constraint) {
      var start = moment(constraint.start);


      return start.format('h:mm');
    };

    $scope.unassign = function(volunteer, slot) {
      var assigned = slot.assigned;

      for(var i = 0; i < volunteer.constraints.length; i++) {

        if(volunteer.constraints[i].name !== "Watching Performance") {

            volunteer.constraints = volunteer.constraints.slice(0,i);
        }

      }
      // PUSH IT REAL GOOD
      $scope.schedule.unassigned.push(assigned.splice(assigned.indexOf(volunteer), 1)[0]);


    };
  });
