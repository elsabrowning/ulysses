'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleBuildCtrl', function($scope) {
    $scope.schedule = null;

    $scope.$parent.schedule.$promise.then(function(schedule) {
      $scope.schedule = schedule;
    });

    $scope.addJob = function() {
      $scope.schedule.jobs.unshift({ slots: [{}] });
    };

    $scope.addSlot = function(job) {
      job.slots.unshift({});
    };

    $scope.removeJob = function(index) {
      $scope.schedule.jobs.splice(index, 1);
    };

    $scope.removeSlot = function(job, index) {
      job.slots.splice(index, 1);
    };
  });
