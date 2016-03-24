'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleInputCtrl', function ($scope, $stateParams, papa, Schedule) {
    $scope.schedule = Schedule.get($stateParams);
    $scope.volunteerCSV = null;

    $scope.process = function(data) {
      if ($scope.volunteerCSV) {
        papa.parse($scope.volunteerCSV, {
          header: true,
          step: function(result) {
            $scope.schedule.volunteers.push(birthVolunteer(result.data[0]));

          },
          complete: function() {
            $scope.$apply();
            console.log($scope.schedule.volunteers);
          }
        });
      }
    };

    var fullName = function(first, last){
      return [first, last].join(" ");
    };

    var birthVolunteer = function(row){
      console.log(row);
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

  });
