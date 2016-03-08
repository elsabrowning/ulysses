'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleBuildCtrl', function ($scope, $state, $stateParams, Schedule) {
    $scope.schedule = Schedule.get($stateParams);

    $scope.save = function() {
      $scope.schedule.$save()
        .then(function() {
          $state.go('^.input');
        }, function() {
          console.log('An error happened / You write terrible software / Life is meaningless');
        });
    };
  });
