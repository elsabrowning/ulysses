'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleEditCtrl', function ($scope, $state, moment) {
    $scope.schedule = null;

    $scope.$parent.schedule.$promise.then(function(schedule) {
      $scope.schedule = schedule;
    });

    $scope.save = function() {
      $scope.schedule.$save()
        .then(function() {
          $state.go('schedule.finalize');
        }, function() {
          console.log('An error happened / You write terrible software / Life is meaningless');
        });
    };

    $scope.timeRange = function(slot) {
      var start = moment(slot.start);
      var end = moment(slot.end);

      return start.format('h:mma') + ' to ' + end.format('h:mma');
    };

  });
