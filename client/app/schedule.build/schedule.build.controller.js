'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleBuildCtrl', function($scope) {
    $scope.schedule = null;
    $scope.slotComments = false;
    $scope.jobComments = false;
    $scope.judgeJobDetails = false;
    $scope.isPrimary = false;
    $scope.probDiv = 0;
    $scope.primDiv = 0;

    $scope.showDetails = function() {
      $scope.judgeJobDetails = !$scope.judgeJobDetails;
    }

    $scope.showSlotComments = function() {
      $scope.slotComments = !$scope.slotComments;
    }

    $scope.showJobComments = function() {
      $scope.jobComments = !$scope.jobComments;
    }

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

    $scope.createJudgeJobs = function () {
      for(var p = 1; p <= 5; p++) {
        for(var d = 1; d <= $scope.probDiv; d++) {
          $scope.schedule.jobs.push({name: "Problem " + p + " Division " + d, isJudging: true});
        }
      }
      if($scope.isPrimary == true) {
        for(var d = 1; d <= $scope.primDiv; d++) {
          $scope.schedule.jobs.push({name: "Primary Division " + d, isJudging: true});
        }
      }

    }

  });
