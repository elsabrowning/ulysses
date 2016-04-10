'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleInputCtrl', function ($scope, papa, $state) {
    $scope.schedule = null;
    $scope.teamCSV = null;
    $scope.volunteerCSV = null;
    $scope.conflicts = {};

    $scope.$parent.schedule.$promise.then(function(schedule) {
      $scope.schedule = schedule;
    });

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

    $scope.processTeams = function(data) {
      console.log("got to processTeams");

      var conflicts = {};
      var divisions = {
        Primary: 0,
        I: 1,
        II: 2,
        III: 3,
        IV: 4
      };

      if ($scope.teamCSV) {
        papa.parse($scope.teamCSV, {
          header: true,
          step: function(result) {
            var row = result.data[0];
            $scope.conflicts['#' + row['Number'] + ' ' + row['Problem'] + '/' + divisions[row['Division']]] = {
              start: moment(row['Longt Time'], 'h:mm A').subtract(15, 'minutes'),
              end: moment(row['Longt Time'], 'h:mm A').add(45, 'minutes')
            };

          },
          complete: function() {
            $scope.$apply();
          }
        });
      }
    };

    $scope.addConstraints = function() {
      for(var index in $scope.schedule.unassigned){
        var volunteer = $scope.schedule.unassigned[index];
        if (volunteer.childTeam) {
          var teams = volunteer.childTeam.split(", ");
          teams.forEach(function(team){
            if(team in $scope.conflicts){
              volunteer.constraints.push($scope.conflicts[team]);
            }
            console.log($scope.schedule.unassigned[index].constraints);
          });
        }
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
        childTeam: row["child_team"],
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
