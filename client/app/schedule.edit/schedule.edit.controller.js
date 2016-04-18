'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleEditCtrl', function ($scope, moment) {
    $scope.schedule = null;
    $scope.earlyTime = new Date('April 13, 2016, 07:00:00');

    $scope.$parent.schedule.$promise.then(function(schedule) {
      $scope.schedule = schedule;
    });

    $scope.auto = function() {
          // Separate judging and non-judging jobs:
          var jobs = {
            judging: $scope.schedule.jobs.filter(function(job) {
              return job.isJudging;
            }),
            nonjudging: $scope.schedule.jobs.filter(function(job) {
              return !job.isJudging;
            })
          };

          // Separate judging and non-judging volunteers:
          var unassigned = {
            judging: $scope.schedule.unassigned.filter(function(volunteer) {
              return volunteer.isJudge;
            }),
            nonjudging: $scope.schedule.unassigned.filter(function(volunteer) {
              return !volunteer.isJudge;
            })
          };

          // For judging and nonjudging:
          for (var type in jobs) {
            // If there are no volunteers of that type, skip:
            if (!unassigned[type].length) {
              continue;
            }

            // Iterate over jobs:
            j:
            for (var i = 0; i < jobs[type].length; i++) {
              var job = jobs[type][i];
              // If someday we care about preferences, do it here...

              // Iterate over slots:
              s:
              for (var j = 0; j < job.slots.length; j++) {
                var slot = job.slots[j];

                // Iterate over volunteers because efficiency is for nerds:
                v:
                for (var k = 0; k < unassigned[type].length; k++) {
                  // If the slot is full, skip:
                  if (slot.assigned.length >= slot.positions) {
                    continue s;
                  }

                  var volunteer = unassigned[type].shift();
                  $scope.schedule.unassigned.splice($scope.schedule.unassigned.indexOf(volunteer), 1);
                  slot.assigned.push(volunteer);
                }
              }
            }
          }
        };
        
    $scope.duration = function(time1, time2){
      return time2.getHours()-time1.getHours() + Math.abs(time2.getMinutes()-time1.getMinutes())/60;
    }

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
            var volThing = slot.assigned.indexOf(vol)
            console.log(vol.name);
            $scope.schedule.unassigned.push(vol);
          }
          slot.assigned = [];
        }
      }
    }

    $scope.helperFunction = function(constraint, slot){
      var count = 0;
      var con = constraint;
      var start = new Date(con.start);
      var end = new Date(con.end);
      var sStart = new Date(slot.start);
      var sEnd = new Date(slot.end);
      var conStart = $scope.duration($scope.earlyTime, start);
      var conEnd = $scope.duration($scope.earlyTime, end);
      var slotStart = $scope.duration($scope.earlyTime, sStart);
      var slotEnd = $scope.duration($scope.earlyTime, sEnd);
      if(((conStart >= slotStart)&&(conStart <= slotEnd)) || ((conEnd >= slotStart) &&(conEnd <= slotEnd))){
        count++;
      } else {
        //do nothing
      }
      return count;
    }

    $scope.populateIndivSlot = function(slot, job){
      var dif = slot.positions - slot.assigned.length;
      for(var k in $scope.schedule.unassigned){
        var vol = $scope.schedule.unassigned[k];
        // console.log(vol.name);
        if(dif != 0){
          if(!job.isJudging && !vol.isJudge){
            if(vol.constraints.length>0){
              for(var l in vol.constraints){
                var con = vol.constraints[l];
                var count = $scope.helperFunction(con, slot);
                if(count != 0){
                  count = 0;
                } else {
                  slot.assigned.push(vol);
                  $scope.schedule.unassigned.splice($scope.schedule.unassigned.indexOf(vol), 1);
                  dif--;
              }
            }
          } else {
            slot.assigned.push(vol);
            $scope.schedule.unassigned.splice($scope.schedule.unassigned.indexOf(vol), 1);
            dif--;
          }
        } else if(job.isJudging && vol.isJudge){
          if(vol.constraints.length>0){
            for(var l in vol.constraints){
              var con = vol.constraints[l];
              var count = $scope.helperFunction(con);
              if(count != 0){
                count = 0;
                } else {
                slot.assigned.push(vol);
                $scope.schedule.unassigned.splice($scope.schedule.unassigned.indexOf(vol), 1);
                dif--;
              }
            }
          } else {
          slot.assigned.push(vol);
          $scope.schedule.unassigned.splice($scope.schedule.unassigned.indexOf(vol), 1);
          dif--;
          }
        } else {
          //do nothing
        }
      }
    }
  }

    // $scope.auto = function (){
    //   for(var i in $scope.schedule.jobs){
    //     var job = $scope.schedule.jobs[i];
    //     // console.log(job.name);
    //     for(var j in job.slots){
    //       var slot = job.slots[j];
    //       // console.log(slot.start);
    //       // console.log(slot.end);
    //       if(slot.assigned.length < slot.positions){
    //         $scope.populateIndivSlot(slot, job);
    //       }
    //     }
    //   }
    // }

    $scope.timeRange = function(slot) {
      var start = moment(slot.start);
      var end = moment(slot.end);

      return start.format('h:mma') + ' to ' + end.format('h:mma');
    };
  });
