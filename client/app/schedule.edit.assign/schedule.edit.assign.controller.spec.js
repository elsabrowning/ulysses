'use strict';

describe('Controller: ScheduleEditCtrl', function () {

  // load the controller's module
  beforeEach(module('ulyssesApp'));

  var ScheduleEditCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScheduleEditCtrl = $controller('ScheduleEditCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
