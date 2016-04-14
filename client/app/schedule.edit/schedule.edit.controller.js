'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleEditCtrl', function ($scope, moment) {
    $scope.schedule = null;

    $scope.$parent.schedule.$promise.then(function(schedule) {
      $scope.schedule = schedule;
    });

    $scope.auto = function() {
      // Separate judging and non-judging volunteers:
      var unassigned = {
        judging: $scope.schedule.unassigned.filter(function(volunteer) {
          return volunteer.isJudge;
        }),
        nonjudging: $scope.schedule.unassigned.filter(function(volunteer) {
          return !volunteer.isJudge;
        })
      };

      // For judging and nonjudging:
      for (var type in jobs) {
        // If there are no volunteers of that type, skip:
        if (!unassigned[type].length) {
          continue;
        }

        // Iterate over jobs:
        j:
        for (var i = 0; i < jobs[type].length; i++) {
          var job = jobs[type][i];
          // If someday we care about preferences, do it here...

          // Iterate over slots:
          s:
          for (var j = 0; j < job.slots.length; j++) {
            var slot = job.slots[j];

            // Iterate over volunteers because efficiency is for nerds:
            v:
            for (var k = 0; k < unassigned[type].length; k++) {
              // If the slot is full, skip:
              if (slot.assigned.length >= slot.positions) {
                continue s;
              }

              var volunteer = unassigned[type].shift();
              $scope.schedule.unassigned.splice($scope.schedule.unassigned.indexOf(volunteer), 1);
              slot.assigned.push(volunteer);
            }
          }
        }
      }
    };

    $scope.timeRange = function(slot) {
      var start = moment(slot.start);
      var end = moment(slot.end);

      return start.format('h:mma') + ' to ' + end.format('h:mma');
    };
  });
