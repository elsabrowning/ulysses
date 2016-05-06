'use strict';

class NavbarController {
  isCollapsed = true;
  scheduleDropdown = false;

  constructor($rootScope, $scope, Auth, Schedule, $uibModal, $log, $location) {
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

  }

}




angular.module('ulyssesApp')
  .controller('NavbarController', NavbarController);
