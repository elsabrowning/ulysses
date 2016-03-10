'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleInputCtrl', function ($scope, papa) {
    $scope.volunteerCSV = null;
    $scope.volunteers = [];

    $scope.process = function(data) {
      if ($scope.volunteerCSV) {
        papa.parse($scope.volunteerCSV, {
          header: true,
          complete: function(results) {
            $scope.volunteers = results.data;
            $scope.$apply();
          }
        });
      }
    };
  });
