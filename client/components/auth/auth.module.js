'use strict';

angular.module('ulyssesApp.auth', [
  'ulyssesApp.constants',
  'ulyssesApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
