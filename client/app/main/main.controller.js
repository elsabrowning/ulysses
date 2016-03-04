'use strict';

(function() {

class MainController {

  constructor($http, $scope, papa) {
    this.$http = $http;
    this.awesomeThings = [];

    $scope.foodForPapa = null;
    $scope.crap = [];

    $scope.eat = function(data) {
      if ($scope.foodForPapa) {
        papa.parse($scope.foodForPapa, {
          header: true,
          complete: function(results) {
            $scope.crap = results.data;
            $scope.$apply();
          }
        });
      }
    };

    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
    });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('ulyssesApp')
  .controller('MainController', MainController);

})();
