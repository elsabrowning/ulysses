'use strict';

class NavbarController {
  isCollapsed = true;
  scheduleDropdown = false;

  constructor($rootScope, $scope, Auth, Schedule, $uibModal, $state, $log, $location) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.hasRole = Auth.hasRole;
    this.getCurrentUser = Auth.getCurrentUser;
    $scope.schedules = Schedule.query();

    $scope.addSchedule = function() {
      if($scope.scheduleName.length > 0) {
        Schedule.save({name: $scope.scheduleName}).$promise.then(function(response) {
          console.log(response);
          $scope.schedules = Schedule.query();
          $location.path('schedule/' + response._id + '/input');
        });
        $scope.schedules = Schedule.query();
        $scope.scheduleName = "";
      }
    }

    //deletes the schedule and takes user to the main page
    $rootScope.deleteSchedule = function(schedule) {
        if (confirm("Are you SURE you want to delete the schedule?")) {
          Schedule.remove({id: schedule._id}).$promise.then(function() {
            $scope.schedules = Schedule.query();
            $location.path('main');
          });
        }
      };

      //duplicates the schedule with only the name changed, " - Copy" is added at the end
      $rootScope.duplicateSchedule = function(schedule) {
        var clone = Object.create(schedule);

        var copyNum = 1;
        for(var i = 0; i < $scope.schedules.length; i++) {
            if($scope.schedules[i].name.substring(0, $scope.schedules[i].name.length - 2) === (schedule.name + " - Copy")) {
                var tempCopyNum = 1 + parseInt($scope.schedules[i].name.substring($scope.schedules[i].name.length - 1, $scope.schedules[i].name.length));
                if(tempCopyNum > copyNum) {
                  copyNum = tempCopyNum;
                }
            }
        }

        clone.name = clone.name + " - Copy " + copyNum;
        clone.date = schedule.date;
        clone.info = schedule.info;
        clone.jobs = schedule.jobs;
        clone.teams = schedule.teams;
        clone.unassigned = schedule.unassigned;


        Schedule.save(clone).$promise.then(function(response) {
          console.log(response);
          $scope.schedules = Schedule.query();
           $state.go('schedule.input', {id: response._id});
        });
      };

  }

}




angular.module('ulyssesApp')
  .controller('NavbarController', NavbarController);
