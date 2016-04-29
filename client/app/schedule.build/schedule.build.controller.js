'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleBuildCtrl', function($scope) {
    $scope.schedule = null;
    //boolean for showing or hiding slot comments
    $scope.slotComments = false;
    //boolean for showing or hiding job comments
    $scope.jobComments = false;
    //boolean for whether or not to display the judge job creation checkboxes
    $scope.judgeJobDetails = false;
    //boolean for whether or not there is a primary
    $scope.isPrimary = false;
    //booleans for each of the problems divisions
    $scope.p1d1 = false;
    $scope.p1d2 = false;
    $scope.p1d3 = false;
    $scope.p1d4 = false;
    $scope.p2d1 = false;
    $scope.p2d2 = false;
    $scope.p2d3 = false;
    $scope.p2d4 = false;
    $scope.p3d1 = false;
    $scope.p3d2 = false;
    $scope.p3d3 = false;
    $scope.p3d4 = false;
    $scope.p4d1 = false;
    $scope.p4d2 = false;
    $scope.p4d3 = false;
    $scope.p4d4 = false;
    $scope.p5d1 = false;
    $scope.p5d2 = false;
    $scope.p5d3 = false;
    $scope.p5d4 = false; = !
    //arrays of whether or not problems have divisions
    $scope.p1BoolArray = [];
    $scope.p2BoolArray = [];
    $scope.p3BoolArray = [];
    $scope.p4BoolArray = [];
    $scope.p5BoolArray = [];

    //function that changes whether judgeJobDetails is true or false
    $scope.showDetails = function() {
      $scope.judgeJobDetails = !$scope.judgeJobDetails;
    }

    
    //function that changes whether slotComments is true or false
    $scope.showSlotComments = function() {
      $scope.slotComments = !$scope.slotComments;
    }

    //function that changes whether jobComments is true or false
    $scope.showJobComments = function() {
      $scope.jobComments = !$scope.jobComments;
    }

    $scope.$parent.schedule.$promise.then(function(schedule) {
      $scope.schedule = schedule;
    });

    //adds a job to the schedule
    $scope.addJob = function() {
      $scope.schedule.jobs.unshift({ slots: [{}] });
    };

    //takes in a slot and returns the end time
    $scope.timePull = function(slot) {
      var start = moment(slot.end);
      return start.format('H:mm');
    };

    //takes in a slot and returns the int value of the end hour
    $scope.hourPull = function(slot) {
      var start = moment(slot.end);
      return parseInt(start.format('H'));
    };

    //takes in a slot and return the int value of the end hour
    $scope.minutePull = function(slot) {
      var start = moment(slot.end);
      return parseInt(start.format('mm'));
    };

    //takes in a slot and return the hour duration
    $scope.prevSlotDurationHour = function(slot) {
      var start = moment(slot.start);
      var end = moment(slot.end);

      var sHour = parseInt(start.format('H'));
      console.log("sHour: " + sHour);
      var eHour = parseInt(end.format('H'));
      console.log("eHour: " + eHour);
      var hourDif = eHour - sHour;

      return hourDif;

    };

    //takes in a slot and returns the minute duration
    $scope.prevSlotDurationMin = function(slot) {
      var start = moment(slot.start);
      var end = moment(slot.end);


      var sMin = parseInt(start.format('mm'));
      var eMin = parseInt(end.format('mm'));
      var minDif = eMin - sMin;

      return minDif;

    };

    //adds a slot to a job of the duration of the previous job and beginning when the previous job ended
    $scope.addSlot = function(job) {
      job.slots.unshift({});
      if(job.slots.length > 1) {
        var prevDurationHour = $scope.prevSlotDurationHour(job.slots[1]);
        var prevDurationMin = $scope.prevSlotDurationMin(job.slots[1]);
        var startTime = $scope.timePull(job.slots[1]);
        var endTime = ($scope.hourPull(job.slots[1]) + prevDurationHour) + ":" + ($scope.minutePull(job.slots[1]) + prevDurationMin);

        job.slots[0].start = new Date('April 1, 2016, ' + startTime + ':00');
        job.slots[0].end = new Date('April 1, 2016, ' + endTime + ':00');
      }
    };

    //removes a job from the schedule
    $scope.removeJob = function(index) {
      $scope.schedule.jobs.splice(index, 1);
    };

    //removes a slot from a its job
    $scope.removeSlot = function(job, index) {
      job.slots.splice(index, 1);
    };

    //creates the automatic judge jobs in the manner specified by the user
    $scope.createJudgeJobs = function () {
      //inserts boolean values of divisions for problems
      $scope.p1BoolArray = [$scope.p1d1, $scope.p1d2, $scope.p1d3, $scope.p1d4];
      $scope.p2BoolArray = [$scope.p2d1, $scope.p2d2, $scope.p2d3, $scope.p2d4];
      $scope.p3BoolArray = [$scope.p3d1, $scope.p3d2, $scope.p3d3, $scope.p3d4];
      $scope.p4BoolArray = [$scope.p4d1, $scope.p4d2, $scope.p4d3, $scope.p4d4];
      $scope.p5BoolArray = [$scope.p5d1, $scope.p5d2, $scope.p5d3, $scope.p5d4];

      //loops through problems and their boolean arrays and adds jobs for the true divisions
      for(var p = 1; p <= 5; p++) {
        var pBoolArray = [];
        if(p == 1) {
          pBoolArray = $scope.p1BoolArray;
        } else if(p == 2) {
          pBoolArray = $scope.p2BoolArray;
        } else if(p == 3) {
          pBoolArray = $scope.p3BoolArray;
        } else if(p == 4) {
          pBoolArray = $scope.p4BoolArray;
        } else if(p == 5) {
          pBoolArray = $scope.p5BoolArray;
        }


        for(var d = 0; d < pBoolArray.length; d++) {
          if(pBoolArray[d] == true) {
            $scope.schedule.jobs.push({name: "Problem " + p + " Division " + (d + 1) + " Spontaneous", training: 5, isJudging: true, slots: [], jobComments: ""});
            $scope.schedule.jobs.push({name: "Problem " + p + " Division " + (d + 1) + " Long-Time", training: 5, isJudging: true, slots: [], jobComments: ""});
          }
        }
      }

      //creates primary slot if primary was checked
      if($scope.isPrimary == true) {
          $scope.schedule.jobs.push({name: "Primary Spontaneous", training: 5, isJudging: true, slots: [], jobComments: ""});
          $scope.schedule.jobs.push({name: "Primary Long-Time", training: 5, isJudging: true, slots: [], jobComments: ""});
      }

      //resets the checkboxes to be empty
      $scope.judgeJobDetails = false;
      $scope.isPrimary = false;
      $scope.p1d1 = false;
      $scope.p1d2 = false;
      $scope.p1d3 = false;
      $scope.p1d4 = false;
      $scope.p2d1 = false;
      $scope.p2d2 = false;
      $scope.p2d3 = false;
      $scope.p2d4 = false;
      $scope.p3d1 = false;
      $scope.p3d2 = false;
      $scope.p3d3 = false;
      $scope.p3d4 = false;
      $scope.p4d1 = false;
      $scope.p4d2 = false;
      $scope.p4d3 = false;
      $scope.p4d4 = false;
      $scope.p5d1 = false;
      $scope.p5d2 = false;
      $scope.p5d3 = false;
      $scope.p5d4 = false;
      $scope.p1BoolArray = [];
      $scope.p2BoolArray = [];
      $scope.p3BoolArray = [];
      $scope.p4BoolArray = [];
      $scope.p5BoolArray = [];

    }

  });
