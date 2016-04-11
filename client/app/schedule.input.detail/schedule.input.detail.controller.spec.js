'use strict';

describe('Controller: ScheduleInputCtrl', function () {

  // load the controller's module
  beforeEach(module('ulyssesApp'));

  var ScheduleInputCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScheduleInputCtrl = $controller('ScheduleInputCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
