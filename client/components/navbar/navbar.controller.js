'use strict';

class NavbarController {
  isCollapsed = true;
  scheduleDropdown = false;

  constructor($scope, Auth, Schedule, $uibModal, $log) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.hasRole = Auth.hasRole;
    this.getCurrentUser = Auth.getCurrentUser;


    $scope.addSchedule = function() {
      if($scope.scheduleName.length > 0) {
        Schedule.save({name: $scope.scheduleName});
        $scope.schedules = Schedule.query();
        $scope.scheduleName = "";
      }
    }

  }

}




angular.module('ulyssesApp')
  .controller('NavbarController', NavbarController);
