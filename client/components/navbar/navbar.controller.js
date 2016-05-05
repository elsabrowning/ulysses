'use strict';

class NavbarController {
  isCollapsed = true;
  scheduleDropdown = false;

  constructor($scope, Auth, Schedule, $uibModal, $log, $location) {
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
          $location.path('schedule/' + response._id + '/build');
        });
        $scope.schedules = Schedule.query();
        $scope.scheduleName = "";
      }
    }

  }

}




angular.module('ulyssesApp')
  .controller('NavbarController', NavbarController);
