'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleInputCtrl', function ($scope, papa, $state) {
    $scope.schedule = null;
    $scope.teamCSV = null;
    $scope.volunteerCSV = null;
    $scope.conflicts = {};
    $scope.unresolvables = 0;
    $scope.unresolvablesStore = [];
    $scope.detail = null;
    $scope.allVolunteers = [];
    $scope.saveTheRows = [];

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

    //adds volunteer to array of unassigned volunteers in the schedule
    $scope.addVolunteer = function() {
      var unassigned = $scope.schedule.unassigned;
      unassigned.unshift({});
      $scope.detail = unassigned[0];
    };

    //removes a volunteer from the schedule
    $scope.removeVolunteer = function(volunteer) {
      var stop = false;
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
              stop = true;
            }
          }
        }
      }
      if(!stop)
      {
        unassigned.splice(unassigned.indexOf(volunteer), 1);
        $scope.open(unassigned[0]);
      }

    };

    //uploads volunteers
    $scope.process = function(data) {
      if ($scope.volunteerCSV) {
        papa.parse($scope.volunteerCSV, {
          header: true,
          step: function(result) {
            //checks against duplicate volunteers
            if(!alreadyAVolunteer(result.data[0]["First name"], result.data[0]["Last name"], result.data[0]["E-mail"])) {
              $scope.schedule.unassigned.push(birthVolunteer(result.data[0]));
            }
            //checks against duplicate jobs
            if(result.data[0]["Job Preference #1"].startsWith("Non-Judging") && !alreadyAJob(result.data[0]["Job Preference #1"]))
            {
              $scope.schedule.jobs.push({name: birthJob1(result.data[0]), training: 5, isJudging: false, slots: [], jobComments: ""});
            }


          },
          complete: function() {
              $scope.$apply();
          }
        });
      }
    };

    //uploads teams
    $scope.processTeams = function(data) {
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
            $scope.schedule.constraintUpload.push({
              desc: '#' + row['Number'] + ' ' + row['Problem'] + '/' + divisions[row['Division']],
              start: moment(row['Longt Time'], 'h:mm A').subtract(15, 'minutes'),
              end: moment(row['Longt Time'], 'h:mm A').add(45, 'minutes'),
              name: "Watching A Performance"
            });
          },
          complete: function() {
            //add team constraints to volunteers
            for(var v = 0; v < $scope.schedule.unassigned.length; v++) {
              var alreadyIn = false;
              var volunteer = $scope.schedule.unassigned[v];
              if(volunteer.childTeam) {
                var teams = volunteer.childTeam.split(", ");

                teams.forEach(function(team){
                  for(var c = 0; c < $scope.schedule.constraintUpload.length; c++) {
                    var constraintUploaded = $scope.schedule.constraintUpload[c];
                    if(team === constraintUploaded.desc) {
                      for(var i = 0; i< volunteer.constraints.length; i++) {
                        var volConstraint = volunteer.constraints[i];
                        if(constraintUploaded.name === volConstraint.name && constraintUploaded.start === volConstraint.start && constraintUploaded.end === volConstraint.end) {
                          alreadyIn = true;
                        }
                      }
                      if(alreadyIn == false) {
                        volunteer.constraints.push(constraintUploaded);
                      }
                    }else {
                      var alreadyUnres = false;
                      var teamSub = team.substring(1, team.length - 4);
                      for(var u = 0; u < $scope.unresolvablesStore.length; u++) {
                        var stored = $scope.unresolvablesStore[u];

                        if(teamSub === stored) {
                          alreadyUnres = true;
                        }
                      }
                      if(alreadyUnres == false) {
                        $scope.unresolvablesStore.push(teamSub);
                        $scope.unresolvables++;
                      }

                    }
                  }
                });
              }
            }


            for(var j = 0; j < $scope.schedule.jobs.length; j++) {
              var job = $scope.schedule.jobs[j];
              for(var s = 0; s < job.slots.length; s++) {
                var slot = job.slots[s];
                for(var v = 0; v < slot.assigned.length; v++) {
                  var alreadyIn = false;
                  var volunteer = slot.assigned[v];
                  if(volunteer.childTeam) {
                    var teams = volunteer.childTeam.split(", ");
                    teams.forEach(function(team){
                      for(var c = 0; c < $scope.schedule.constraintUpload.length; c++) {
                        var constraintUploaded = $scope.schedule.constraintUpload[c];
                        if(team === constraintUploaded.desc) {
                          for(var i = 0; i< volunteer.constraints.length; i++) {
                            var volConstraint = volunteer.constraints[i];
                            if(constraintUploaded.name === volConstraint.name && constraintUploaded.start === volConstraint.start && constraintUploaded.end === volConstraint.end) {
                              alreadyIn = true;
                            }
                          }
                          if(alreadyIn == false) {
                            volunteer.constraints.push(constraintUploaded);
                          }
                        } else {
                          var alreadyUnres = false;
                          var teamSub = team.substring(1, team.length - 4);
                          for(var u = 0; u < $scope.unresolvablesStore.length; u++) {
                            var stored = $scope.unresolvablesStore[u];

                            if(teamSub === stored) {
                              alreadyUnres = true;
                            }
                          }
                          if(alreadyUnres == false) {
                            $scope.unresolvablesStore.push(teamSub);
                            $scope.unresolvables++;
                          }

                        }
                      }
                    });
                  }
                }
              }
            }
            console.log("store " + $scope.unresolvablesStore);
            $scope.$apply();
          }
        });
      }

    };



    //adds team constraints to volunteers
    $scope.addConstraints = function() {
      //add team constraints to volunteers
      for(var v = 0; v < $scope.schedule.unassigned.length; v++) {
        var alreadyIn = false;
        var volunteer = $scope.schedule.unassigned[v];
        if(volunteer.childTeam) {
          var teams = volunteer.childTeam.split(", ");

          teams.forEach(function(team){
            for(var c = 0; c < $scope.schedule.constraintUpload.length; c++) {
              var constraintUploaded = $scope.schedule.constraintUpload[c];
              if(team === constraintUploaded.desc) {
                for(var i = 0; i< volunteer.constraints.length; i++) {
                  var volConstraint = volunteer.constraints[i];
                  if(constraintUploaded.name === volConstraint.name && constraintUploaded.start === volConstraint.start && constraintUploaded.end === volConstraint.end) {
                    alreadyIn = true;
                  }
                }
                if(alreadyIn == false) {
                  volunteer.constraints.push(constraintUploaded);
                }
              }
            }
          });
        }
      }


      for(var j = 0; j < $scope.schedule.jobs.length; j++) {
        var job = $scope.schedule.jobs[j];
        for(var s = 0; s < job.slots.length; s++) {
          var slot = job.slots[s];
          for(var v = 0; v < slot.assigned.length; v++) {
            var alreadyIn = false;
            var volunteer = slot.assigned[v];
            if(volunteer.childTeam) {
              var teams = volunteer.childTeam.split(", ");
              teams.forEach(function(team){
                for(var c = 0; c < $scope.schedule.constraintUpload.length; c++) {
                  var constraintUploaded = $scope.schedule.constraintUpload[c];
                  if(team === constraintUploaded.desc) {
                    for(var i = 0; i< volunteer.constraints.length; i++) {
                      var volConstraint = volunteer.constraints[i];
                      if(constraintUploaded.name === volConstraint.name && constraintUploaded.start === volConstraint.start && constraintUploaded.end === volConstraint.end) {
                        alreadyIn = true;
                      }
                    }
                    if(alreadyIn == false) {
                      volunteer.constraints.push(constraintUploaded);
                    }
                  }
                }
              });
            }
          }
        }
      }

    };


    //combines first and last name into one name
    var fullName = function(first, last){
      return [first, last].join(" ");
    };

    //checks through jobs to make sure that job is not already in existence
    var alreadyAJob = function(pref) {
      var jobAlready = false;
      if(pref.substring("Non-Judging ".length, pref.length) === "" || pref.substring("Non-Judging ".length, pref.length) === " " || pref.substring("Non-Judging ".length, pref.length) === "No Preference") {
        jobAlready = true;
      } else {
        for(var i = 0; i < $scope.schedule.jobs.length; i++) {
          if(pref.substring("Non-Judging ".length, pref.length) === $scope.schedule.jobs[i].name) {
            jobAlready = true;
          }
        }
      }
      return jobAlready;
    }

    //checks to see if a volunteer is already in the schedule
    var alreadyAVolunteer = function(firstName, lastName, email) {
      for(var i = 0; i < $scope.schedule.unassigned.length; i++) {
        if((firstName + " " + lastName) === $scope.schedule.unassigned[i].name && email === $scope.schedule.unassigned[i].email ) {
          return true;
        }
      }

      for(var j = 0; j < $scope.schedule.jobs.length; j++) {
        var job = $scope.schedule.jobs[j];
        for(var s = 0; s < job.slots.length; s++) {
          var slot = job.slots[s];
          for(var v = 0; v < slot.assigned.length; v++) {
            var volunteer = slot.assigned[v];
            if((firstName + " " + lastName) === volunteer.name && email === volunteer.email ) {
              return true;
            }
          }
        }
      }
      return false;
    }

    //returns the name of the job
    var birthJob1 = function(row) {
      var pref = row["Job Preference #1"];
      var jobName;
      jobName = pref.substring("Non-Judging ".length, pref.length);

      return jobName;
    };

    //returns the volunteer to be added to the schedule
    var birthVolunteer = function(row) {
      return {
        name: fullName(row["First name"], row["Last name"]),
        email: row["E-mail"],
        phone: parseInt(row["phone"].replace(/\D/g,'')),
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

    //returns an array of the volunteers job preferences so that preferences are in volunteer info upon upload
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



    //returns time range of constraint in form of start time 'to' end time
    $scope.timeRange = function(constraint) {
      var start = moment(constraint.start);
      var end = moment(constraint.end);

      return start.format('h:mma') + ' to ' + end.format('h:mma');
    };






  });
