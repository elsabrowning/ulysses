'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleViewCtrl', function ($scope) {
    $scope.hour = 134;
    $scope.schedule = null;
    $scope.timeArray = [];
    $scope.earlyTime = new Date('April 13, 2016, 07:00:00');
    $scope.lateTime = new Date('April 13, 2016, 17:00:00');

    $scope.$parent.schedule.$promise.then(function(schedule) {
      $scope.schedule = schedule;
    });

    $scope.populateTimeArray = function(date){
      var earlyTime = moment($scope.earlyTime);
      $scope.timeArray.push(earlyTime.format('h:mm a'));
      for(var i = 1; i<13; i++){
        $scope.timeArray.push(earlyTime.add(1, 'hours').format('h:mm a'));
      };
    }
    $scope.populateTimeArray();

    $scope.duration = function(time1, time2){
      return time2.getHours()-time1.getHours() + Math.abs(time2.getMinutes()-time1.getMinutes())/60;
    }relative

    $scope.borderColorCode = function(slot){
      if(slot.assigned.length == 0){
        return "red";
      }
      if(slot.assigned.length < slot.positions){
        return "orange";
      }
      return "green";
    }

    $scope.colorCode = function(slot){
      if(slot.assigned.length == 0){
        return "#f2dede";
      }
      if(slot.assigned.length < slot.positions){
        return "#fcf8e3";
      }
      return "#dff0d8";
    }

    $scope.calculateSlotPosition = function(slot) {
      var start = new Date(slot.start)
      var end = new Date(slot.end);
      var offset = $scope.duration($scope.earlyTime, start);
      var shiftLength = $scope.duration(start, end);

      console.log($scope.hour * offset + 100);
      return {
        left: $scope.hour * offset + 100,
        width: $scope.hour * shiftLength - 6,
        backgroundColor: $scope.colorCode(slot),
        borderColor: $scope.borderColorCode(slot)
      };
    }
  });
