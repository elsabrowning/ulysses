'use strict';

class NavbarController {
  isCollapsed = true;
  scheduleDropdown = false;

  constructor($scope, Auth, Schedule) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.hasRole = Auth.hasRole;
    this.getCurrentUser = Auth.getCurrentUser;

    $scope.schedules = Schedule.query();
  }
}

angular.module('ulyssesApp')
  .controller('NavbarController', NavbarController);
