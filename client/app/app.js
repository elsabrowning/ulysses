'use strict';

angular.module('ulyssesApp', [
  'ulyssesApp.auth',
  'ulyssesApp.admin',
  'ulyssesApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .value('moment', moment)
  .value('papa', Papa);
