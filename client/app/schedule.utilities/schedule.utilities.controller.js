'use strict';
(function(){

function ScheduleUtilitiesComponent($scope) {
  $scope.message = 'Hello';
}

angular.module('ulyssesApp')
  .component('schedule.utilities', {
    templateUrl: 'app/schedule.utilities/schedule.utilities.html',
    controller: ScheduleUtilitiesComponent
  });

})();
