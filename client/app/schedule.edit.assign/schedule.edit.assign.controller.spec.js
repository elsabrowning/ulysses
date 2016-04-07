'use strict';

describe('Component: ScheduleEditAssignComponent', function () {

  // load the controller's module
  beforeEach(module('ulyssesApp'));

  var ScheduleEditAssignComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ScheduleEditAssignComponent = $componentController('ScheduleEditAssignComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
