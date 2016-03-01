'use strict';

describe('Controller: ScheduleViewCtrl', function () {

  // load the controller's module
  beforeEach(module('ulyssesApp'));

  var ScheduleViewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScheduleViewCtrl = $controller('ScheduleViewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
