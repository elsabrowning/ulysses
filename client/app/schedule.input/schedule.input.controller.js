'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleInputCtrl', function ($scope, $stateParams, papa, Schedule, $state) {
    $scope.schedule = Schedule.get($stateParams);
    $scope.volunteerCSV = null;

    $scope.add = function() {
      $scope.schedule.unassigned.unshift({});
    };

    $scope.remove = function(index) {
      $scope.schedule.unassigned.splice(index, 1);
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
    // 
    // $scope.processTeams = function(data) {
    //   console.log("got to processTeams");
    //
    //   var numbers = [];
    //
    //   if ($scope.teamCSV) {
    //     papa.parse($scope.teamCSV, {
    //       header: true,
    //       step: function(result) {
    //         var row = result.data[0];
    //
    //         if (numbers.indexOf(row["Number"]) == -1) {
    //           // do team birthing shit
    //           numbers.push(row["Number"]);
    //         }
    //
    //         // populate problems
    //         addProblem()
    //           $scope.schedule.teams.push(birthTeam(result.data[0]));
    //       },
    //       complete: function() {
    //         $scope.$apply();
    //       }
    //     });
    //   }
    // };

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
        childTeam: row["child_team"],
        constraints: [],
        comments: row["comment"],
        shirt: row["T-shirt"],
        positions: [],
        preferences: []
      };
    };

    var birthTeam = function(row) {
      if(row["Number"])
      return {
        number: row["Number"],
        problems: [birthTeamInfo(row)]
      };
    };

    var birthTeamInfo = function(row) { //sorry Kyle :(
      console.log("This is the birth team");
      return {
        problem: row["Problem"],
        division: row["Division"],
        longterm: row["Longt Time"],
        spontaneous: row["Spont Time"]
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
