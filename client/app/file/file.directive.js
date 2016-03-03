'use strict';

angular.module('ulyssesApp')
  .directive("fileRead", [function () {
    return {
      scope: {
        fileRead: "="
      },
      link: function (scope, element, attributes) {
        element.on('change', function (changeEvent) {
          scope.$apply(function () {
            scope.fileRead = changeEvent.target.files[0];
          });
        });
      }
    }
  }]);
