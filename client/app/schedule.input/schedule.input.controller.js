'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleInputCtrl', function ($scope, papa, $state) {
    $scope.schedule = null;
    $scope.teamCSV = null;
    $scope.volunteerCSV = null;
    $scope.conflicts = {};
    $scope.unresolvables = 0;
    $scope.detail = null;
    $scope.allVolunteers = [];

    $scope.$parent.schedule.$promise.then(function(schedule) {
      $scope.schedule = schedule;
    });

    $scope.count = function(object) {
      return Object.keys(object).length;
    };

    $scope.open = function(volunteer) {
      $scope.detail = volunteer;
    };

    $scope.close = function() {
      $scope.detail = null;
    };

    $scope.addVolunteer = function() {
      var unassigned = $scope.schedule.unassigned;
      unassigned.unshift({});
      $scope.detail = unassigned[0];
    };

    $scope.removeVolunteer = function(volunteer) {
      var unassigned = $scope.schedule.unassigned;
      for(var i in $scope.schedule.jobs){
        var job = $scope.schedule.jobs[i];
        for(var j in job.slots){
          var slot = job.slots[j];
          for(var k in slot.assigned){
            var aVol = slot.assigned[k];
            console.log(aVol);
            if(aVol == volunteer){
              //lol hi Dan, SCREW YOU, I'M DOING A WINDOW ALERT!
              window.alert(volunteer.name + " is assigned to " + job.name + ". Please unassign volunteer before deleting.");
            }
          }
        }
      }
      unassigned.splice(unassigned.indexOf(volunteer), 1);
    };

    //uploads volunteers
    $scope.process = function(data) {
      if ($scope.volunteerCSV) {
        papa.parse($scope.volunteerCSV, {
          header: true,
          step: function(result) {
            $scope.schedule.unassigned.push(birthVolunteer(result.data[0]));
            if(result.data[0]["Job Preference #1"].startsWith("Non-Judging") && !alreadyAJob(result.data[0]["Job Preference #1"]))
            {
              console.log("the pref " + result.data[0]["Job Preference #1"] + " the result " + result.data[0]["Job Preference #1"].startsWith("Non-Judging"));
              $scope.schedule.jobs.push({name: birthJob1(result.data[0])});
            }


          },
          complete: function() {
              //$scope.schedule.jobs.push({name: "Problem 1 Division 1"});
              $scope.$apply();
          }
        });
      }
    };

    //uploads teams
    $scope.processTeams = function(data) {
      console.log("got to processTeams");

      var divisions = {
        Primary: 0, //primary listed as 1's in csv? Error?
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
              end: moment(row['Longt Time'], 'h:mm A').add(45, 'minutes'),
              name: "Watching A Performance"
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
            if(team in $scope.conflicts) {
              volunteer.constraints.push($scope.conflicts[team]);
            }
            else {
              $scope.unresolvables++;
            }
          });
        }
      }
    };

    var fullName = function(first, last){
      return [first, last].join(" ");
    };

    var alreadyAJob = function(pref) {
      var jobAlready = false;
      if(pref.substring("Non-Judging ".length, pref.length) === "" || pref.substring("Non-Judging ".length, pref.length) === " " || pref.substring("Non-Judging ".length, pref.length) === "No Preference") {
        jobAlready = true;
      } else {
        for(var i = 0; i < $scope.schedule.jobs.length; i++) {
          console.log("pref name: " + pref.substring("Non-Judging ".length, pref.length) + " job name: " + $scope.schedule.jobs[i].name + " equal? " + pref.substring("Non-Judging ".length, pref.length) === $scope.schedule.jobs[i].name);

          if(pref.substring("Non-Judging ".length, pref.length) === $scope.schedule.jobs[i].name) {
            jobAlready = true;
          }
        }
      }
      return jobAlready;
    }

    var birthJob1 = function(row) {
      var pref = row["Job Preference #1"];
      var jobName;
      jobName = pref.substring("Non-Judging ".length, pref.length);

      return jobName;
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
        isJudge: row[""] == "AS_JUDGE",
        preferences: jobPrefs(row["Job Preference #1"], row["Job Preference #2"])
      };
    };

    var jobPrefs = function(pref1, pref2) {
      var prefsArray = [];
      var firstElement;
      if(pref1 == "" || pref1 == null) {
        return [];
      } else {
        if(pref1.startsWith("Non-Judging")) {
          if(pref1.substring("Non-Judging ".length, pref1.length) != "No Preference" && pref1.substring("Non-Judging ".length, pref1.length) != "") {
            prefsArray.push(pref1.substring("Non-Judging ".length, pref1.length));
            firstElement = pref1.substring("Non-Judging ".length, pref1.length);
          }
        } else {
          if(pref1.endsWith("No Preference")) {
            prefsArray.push(pref1.substring(0, pref1.length - " No Preference".length));
            firstElement = pref1.substring(0, pref1.length - " No Preference".length);
          } else {
            prefsArray.push(pref1);
            firstElement = pref1;
          }

        }
        if(pref2 != "" && pref2 != null) {
          if(pref2.startsWith("Non-Judging")) {
            if(pref2.substring("Non-Judging ".length, pref2.length) != "No Preference" && pref2.substring("Non-Judging ".length, pref2.length) != "") {
              if(pref2.substring("Non-Judging ".length, pref2.length) != firstElement) {
                prefsArray.push(pref2.substring("Non-Judging ".length, pref2.length));
              }
            }
          } else {
            if(pref2.endsWith("No Preference")) {
              if(pref2.substring(0, pref2.length - " No Preference".length) != firstElement) {
                prefsArray.push(pref2.substring(0, pref2.length - " No Preference".length));
              }
            } else {
              if(pref2 != firstElement) {
                prefsArray.push(pref2);
              }
            }
          }
        }
          return prefsArray;
      }
    }




    $scope.timeRange = function(constraint) {
      var start = moment(constraint.start);
      var end = moment(constraint.end);

      return start.format('h:mma') + ' to ' + end.format('h:mma');
    };






  });
