'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleInputCtrl', function ($scope, $stateParams, papa, Schedule, $state) {
    $scope.schedule = Schedule.get($stateParams);
    $scope.volunteerCSV = null;

    $scope.add = function() {
      $scope.schedule.unassigned.push({});
    };

    $scope.process = function(data) {
      if ($scope.volunteerCSV) {
        papa.parse($scope.volunteerCSV, {
          header: true,
          step: function(result) {
            $scope.schedule.unassigned.push(birthVolunteer(result.data[0]));
          },
          complete: function() {
            $scope.$apply();
          }
        });
      }
    };

    var fullName = function(first, last){
      return [first, last].join(" ");
    };

    var birthVolunteer = function(row) {
      return {
        name: fullName(row["First name"], row["Last name"]),
        email: row["E-mail"],
        phone: row["phone"],
        username: row["username"],
        password: row["password"],
        constraints: [],
        comments: row["comment"],
        shirt: row["T-shirt"],
        positions: [],
        preferences: []
      };
    };

    $scope.save = function() {
      $scope.schedule.$save()
        .then(function() {
          $state.go('^.edit');
        }, function() {
          console.log('An error happened / You write terrible software / Life is meaningless');
        });
    };

  });
