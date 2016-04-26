'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleEditAssignCtrl', function ($scope, $state, $stateParams) {
    $scope.schedule = null;
    $scope.job = null;
    $scope.slot = null;
    $scope.errorMessage = "";
    $scope.addThemAnyway = false;
    $scope.tempVol = null;
    $scope.tempSlot = null;

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

    $scope.timeRange = function(constraint) {
      if(constraint != null) {
        var start = moment(constraint.start);
        var end = moment(constraint.end);

        return start.format('h:mma') + ' to ' + end.format('h:mma');
      }
    };





    //checks to see if two time slots overlap
    $scope.isConflict = function(slot1, slot2) {
      var start1 = parseInt($scope.timeStart(slot1));
      var end1 = parseInt($scope.timeEnd(slot1));
      var start2 = parseInt($scope.timeStart(slot2));
      var end2 = parseInt($scope.timeEnd(slot2));


      if((start1 <= start2 && start2 <= end1)) {
       // console.log("scenario1");
        return true;
      }
      else if(start2 <= start1 && start1 <= end2) {
       // console.log("scenario2");
        return true;
      }
      else if(start1 == start2 && end1 == end2)
      {
       // console.log("scenario3");
        return true;
      } else {
        //console.log("scenario4");
        return false;
      }
    };



    // creates an array of volunteers who prefered a specific job
    // $scope.listByPreferences = function(volunteer) {
    //   var volunteersThatPreferJob = [];
    //   for (var i = 0; i < VolunteerSchema.length(); i++){
    //     if (volunteer.preferences == job.name && ){
    //       volunteersThatPreferJob.push(volunteer);
    //     }
    //     return volunteersThatPreferjob;
    //   }
    // };

    //loops through volunteer constraints to check conflict loop
    $scope.conflictLoop = function(volunteer, slot) {
      var conflicting = false;
      for(var i = 0; i < volunteer.constraints.length; i++) {
        if($scope.isConflict(volunteer.constraints[i], slot)) {
          if($scope.errorMessage === "")
          {
            $scope.errorMessage = volunteer.name + " is occupied with " + volunteer.constraints[i].name + " from " + $scope.timeRange(volunteer.constraints[i]);
          } else {
            $scope.errorMessage += " and " + volunteer.constraints[i].name + " from " + $scope.timeRange(volunteer.constraints[i]);
            console.log("volunteer.constraints[i] " + volunteer.constraints[i]);
          }
          if(i = volunteer.constraints.length) {
            $scope.errorMessage += ".";
          }
          conflicting = true;
        }
      }
      return conflicting;
    };

    $scope.conflictLoopNoMess = function(volunteer, slot) {
      var conflicting = false;
      for(var i = 0; i < volunteer.constraints.length; i++) {
        if($scope.isConflict(volunteer.constraints[i], slot)) {
          conflicting = true;
        }
      }
      return conflicting;
    };

    $scope.assign = function(volunteer, slot) {
      $scope.addThemAnyway = false;
      $scope.errorMessage = "";
      var unassigned = $scope.schedule.unassigned;
      // if((slot.positions - slot.assigned.length) > 0) {
        if(!$scope.conflictLoop(volunteer,slot)){
          // AH, PUSH IT
          slot.assigned.push(unassigned.splice(unassigned.indexOf(volunteer), 1)[0]);
          volunteer.constraints.push({start: slot.start, end: slot.end, name: $scope.job.name});

        } else {
          $scope.addThemAnyway = true;
          $scope.tempVol = volunteer;
        }
      //}
    };

    $scope.override = function(slot) {
      $scope.errorMessage = "";
      var unassigned = $scope.schedule.unassigned;
        // AH, PUSH IT
        slot.assigned.push(unassigned.splice(unassigned.indexOf($scope.tempVol), 1)[0]);
      $scope.tempVol.constraints.push({start: slot.start, end: slot.end, name: $scope.job.name});
      $scope.addThemAnyway = false;
    };

    $scope.remainingPositions = function(slot) {
      var remaining = slot.positions - slot.assigned.length;
      return Array(remaining < 0 ? 0 : remaining);
    };

    $scope.timeStart = function(constraint) {
      var start = moment(constraint.start);
      return start.format('Hmm');
    };

    $scope.timeEnd = function(constraint) {
      var end = moment(constraint.end);


      return end.format('Hmm');
    };

    $scope.unassign = function(volunteer, slot, job) {
      var assigned = slot.assigned;

      for(var i = 0; i < volunteer.constraints.length; i++) {
        console.log("job name " + job.name);
        if(volunteer.constraints[i].name === job.name) {
            volunteer.constraints = volunteer.constraints.slice(0,i).concat(volunteer.constraints.slice(i + 1, volunteer.constraints.length + 1));
        }

      }
      // PUSH IT REAL GOOD
      $scope.schedule.unassigned.push(assigned.splice(assigned.indexOf(volunteer), 1)[0]);


    };
  });
