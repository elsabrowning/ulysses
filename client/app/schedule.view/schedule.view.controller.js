'use strict';

angular.module('ulyssesApp')
  .controller('ScheduleViewCtrl', function ($scope) {
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
      for(var i = 1; i<25; i++){
        $scope.timeArray.push(earlyTime.add(30, 'minutes').format('h:mm a'));
      };
    }
    $scope.populateTimeArray();

    $scope.calculateSlotPosition = function(slot) {
      var start = new Date(slot.start)
      var dif = (start.getHours()-$scope.earlyTime.getHours()) + (Math.abs(start.getMinutes()-$scope.earlyTime.getMinutes())/60);

      return {
        top: 100 * dif,
      };
    }
  });
