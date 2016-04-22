'use strict';

describe('Component: ScheduleUtilitiesComponent', function () {

  // load the controller's module
  beforeEach(module('ulyssesApp'));

  var ScheduleUtilitiesComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ScheduleUtilitiesComponent = $componentController('ScheduleUtilitiesComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
