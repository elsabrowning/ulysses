'use strict';

(function() {

class MainController {

  constructor($http, $scope, papa) {
    this.$http = $http;
    this.awesomeThings = [];

    $scope.foodForPapa = null;

    $scope.$watch('foodForPapa', function(data) {
      console.log($scope.foodForPapa);
    });

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
