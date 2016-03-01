'use strict';

class NavbarController {
  isCollapsed = true;

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.hasRole = Auth.hasRole;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('ulyssesApp')
  .controller('NavbarController', NavbarController);
