'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleBuildCtrl', function ($scope, $state, $stateParams, Schedule) {
    $scope.schedule = Schedule.get($stateParams);

    $scope.save = function() {
      $scope.schedule.$save()
        .then(function() {
          $state.go('^.input', { id: $scope.schedule._id });
        }, function() {
          console.log('An error happened / You write terrible software / Life is meaningless');
        });
    };

    $scope.remove = function(jobIndex, slotIndex) {
      console.log("this is the jobIndex: " + jobIndex + " this is the slotIndex: " + slotIndex);
      $scope.schedule.jobs[jobIndex].slots.splice(slotIndex, 1);
    };
  });
