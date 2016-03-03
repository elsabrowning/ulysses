'use strict';

angular.module('ulyssesApp')
  .directive("file-read", [function () {
    return {
      scope: {
        fileRead: "="
      },
      link: function (scope, element, attributes) {
        element.bind("change", function (changeEvent) {
          scope.$apply(function () {
            scope.fileRead = changeEvent.target.files[0];
          });
        });
      }
    }
  }]);
