'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleEditCtrl', function ($scope, moment) {
    $scope.schedule = null;
    $scope.earlyTime = new Date('April 13, 2016, 07:00:00');




    $scope.$parent.schedule.$promise.then(function(schedule) {
      $scope.schedule = schedule;
    });




    //checks to see if two time slots overlap
    $scope.isConflict = function(slot1, slot2) {
      var start1 = parseInt($scope.timeStart(slot1));
      var end1 = parseInt($scope.timeEnd(slot1));
      var start2 = parseInt($scope.timeStart(slot2));
      var end2 = parseInt($scope.timeEnd(slot2));


      if((start1 <= start2 && start2 <= end1)) {
        // console.log("scenario1");
        return true;
      }
      else if(start2 <= start1 && start1 <= end2) {
        // console.log("scenario2");
        return true;
      }
      else if(start1 == start2 && end1 == end2)
      {
        // console.log("scenario3");
        return true;
      } else {
        //console.log("scenario4");
        return false;
      }
    };

    $scope.timeStart = function(constraint) {
      var start = moment(constraint.start);
      return start.format('Hmm');
    };

    $scope.timeEnd = function(constraint) {
      var end = moment(constraint.end);
      return end.format('Hmm');
    };

    //loops through volunteer constraints to check conflict loop
    $scope.conflictLoop = function(volunteer, slot) {
      var conflicting = false;
      for(var i = 0; i < volunteer.constraints.length; i++) {
        if($scope.isConflict(volunteer.constraints[i], slot)) {
          conflicting = true;
        }
      }
      return conflicting;
    };

    $scope.auto = function () {
      //variables to hold arrays of jobs and volunteers separated by judging versus nonjudging
      var judgeJobs = [];
      var nonJudgeJobs = [];
      var judgeVol = [];
      var nonJudgeVol = [];
      //master list of volunteers
      var allVol = [];
      //variable which tracks whether a volunteer has been assigned
      var assignment = false;

      //forming array of judging jobs
      $scope.schedule.jobs.forEach(function(job) {
        if(job.isJudging) {
          judgeJobs.push(job);
        }
      });

      //forming array of nonjudging jobs
      $scope.schedule.jobs.forEach(function(job) {
        if(!job.isJudging) {
          nonJudgeJobs.push(job);
        }
      });


      //forming array of judges
      $scope.schedule.unassigned.forEach(function(vol) {
        if(vol.isJudge) {
          judgeVol.push(vol);

        }
      });


      //removing judges from $scope.schedule.unassigned
      judgeVol.forEach(function(vol) {
        if(vol.isJudge) {
          $scope.schedule.unassigned = $scope.schedule.unassigned.slice(0,$scope.schedule.unassigned.indexOf(vol)).concat($scope.schedule.unassigned.slice($scope.schedule.unassigned.indexOf(vol) + 1,$scope.schedule.unassigned.length + 1));
        }
      });



      //forming array of volunteers
      $scope.schedule.unassigned.forEach(function(vol) {
        if(!vol.isJudge) {
          nonJudgeVol.push(vol);
        }
      });

      //removing volunteers from $scope.schedule.unassigned
      nonJudgeVol.forEach(function(vol) {
        if(!vol.isJudge) {
          $scope.schedule.unassigned = $scope.schedule.unassigned.slice(0,$scope.schedule.unassigned.indexOf(vol)).concat($scope.schedule.unassigned.slice($scope.schedule.unassigned.indexOf(vol) + 1,$scope.schedule.unassigned.length + 1));
        }
      });


      /*
      nonJudgeVol.sort(function(a,b) {
        return b.constraints.length - a.constraints.length;
      });

    */

      //loop which assigns judges to judging jobs
      judgeVol.forEach(function(volunteer) {
        assignment = false;
        judgeJobs.forEach(function(job) {
          job.slots.forEach(function(slot) {
            if(assignment == false) {
              if((slot.positions - slot.assigned.length) > 0) {


                if(!$scope.conflictLoop(volunteer,slot)){

                  // AH, PUSH IT
                  slot.assigned.push(volunteer);
                  //console.log("length before judge " + judgeVol.slice(0,judgeVol.indexOf(volunteer)).length);
                  //console.log("length after judge " + judgeVol.slice((judgeVol.indexOf(volunteer) + 1) ,judgeVol.length + 1).length);
                  judgeVol = judgeVol.slice(0,judgeVol.indexOf(volunteer)).concat(judgeVol.slice(judgeVol.indexOf(volunteer) + 1,judgeVol.length + 1));

                  volunteer.constraints.push({start: slot.start, end: slot.end, name: job.name});
                  assignment = true;
                }
              }
            }
          });
        });
      });

      //combines array of judges and volunteers
      allVol = nonJudgeVol.concat(judgeVol);

    /*

      judgeVol.sort(function(a,b) {
        return b.constraints.length - a.constraints.length;
      });

      */

      //loop to assign all remaining judges and volunteers to jobs
      allVol.forEach(function(volunteer) {
        assignment = false;
        nonJudgeJobs.forEach(function(job) {
          job.slots.forEach(function(slot) {
            if(assignment == false) {

                //console.log("vol: " + volunteer.name + volunteer.email + " job " + job.name + " slot " + slot.positions);
                if((slot.positions - slot.assigned.length) > 0) {
                  if(!$scope.conflictLoop(volunteer,slot)){
                    // AH, PUSH IT
                    slot.assigned.push(volunteer);
                    allVol = allVol.slice(0,allVol.indexOf(volunteer)).concat(allVol.slice(allVol.indexOf(volunteer) + 1,allVol.length + 1));
                    volunteer.constraints.push({start: slot.start, end: slot.end, name: job.name})
                    assignment = true;
                  }
                }
            }
          });
        });
      });


      //puts remaining volunteers and remaining judges back into $scope.schedule.unassigned
      allVol.forEach(function(vol) {
        $scope.schedule.unassigned.push(vol);
      });
    }

    //takes in date objects and returns the differences between two times
    $scope.duration = function(time1, time2){
      return time2.getHours()-time1.getHours() + Math.abs(time2.getMinutes()-time1.getMinutes())/60;
    };

    //removes all volunteers and judges from all slots and repopulates unassigned
    $scope.unLucky = function() {
      console.log($scope.schedule.jobs);
      for(var i = 0; i<$scope.schedule.jobs.length; i++){
        var job = $scope.schedule.jobs[i];
        console.log(job.name);
        for(var j = 0; j<job.slots.length; j++){
          var slot = job.slots[j];
          console.log(slot.start);
          for(var k = 0; k<slot.assigned.length; k++){
            var vol = slot.assigned[k];
            console.log(vol.name);
            for(var i = 0; i < vol.constraints.length; i++) {

              if(vol.constraints[i].name === job.name) {

                vol.constraints = vol.constraints.slice(i,i + 1);
              }

            }
            $scope.schedule.unassigned.push(vol);
          }
          slot.assigned = [];
        }
      }
    }


    //takes in a slot and returns the range of time of the slot
    $scope.timeRange = function(slot) {
      var start = moment(slot.start);
      var end = moment(slot.end);

      return start.format('h:mma') + ' to ' + end.format('h:mma');
    };



  });
