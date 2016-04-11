'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleInputDetailCtrl', function($scope, $state, $stateParams) {
    $scope.schedule = null;
    $scope.volunteer = null;

    $scope.$parent.$parent.schedule.$promise.then(function(schedule) {
      $scope.schedule = schedule;

      $scope.schedule.unassigned.forEach(function(volunteer) {
        if (volunteer._id == $stateParams.volunteer) {
          $scope.volunteer = volunteer;
        }
      });
    });

    $scope.close = function() {
      console.log('WHYYYY');
      console.log($state.go('schedule.input', $stateParams));
      $scope.schedule.$save(function() {
        console.log('AARGH');
        $state.go('schedule.input', $stateParams);
      }, console.log);
    };

    $scope.remove = function(index) {
      $scope.schedule.unassigned.splice(index, 1);
    };
  });
