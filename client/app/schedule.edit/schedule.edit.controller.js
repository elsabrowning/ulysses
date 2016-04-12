'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleEditCtrl', function ($scope, moment) {
    $scope.schedule = null;

    $scope.$parent.schedule.$promise.then(function(schedule) {
      $scope.schedule = schedule;
    });

    $scope.auto = function() {
      // Separate judging and non-judging jobs:
      var jobs = {
        judging: $scope.schedule.jobs.filter(function(job) {
          return job.isJudging;
        }),
        nonjudging: $scope.schedule.jobs.filter(function(job) {
          return !job.isJudging;
        })
      };

      // Separate judging and non-judging volunteers:
      var unassigned = {
        judging: $scope.schedule.unassigned.filter(function(volunteer) {
          return volunteer.isJudge;
        }),
        nonjudging: $scope.schedule.unassigned.filter(function(volunteer) {
          return !volunteer.isJudge;
        })
      };

      console.log(unassigned);
    };

    $scope.timeRange = function(slot) {
      var start = moment(slot.start);
      var end = moment(slot.end);

      return start.format('h:mma') + ' to ' + end.format('h:mma');
    };
  });
