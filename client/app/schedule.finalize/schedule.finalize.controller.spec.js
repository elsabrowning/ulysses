'use strict';

describe('Controller: ScheduleFinalizeCtrl', function () {

  // load the controller's module
  beforeEach(module('ulyssesApp'));

  var ScheduleFinalizeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScheduleFinalizeCtrl = $controller('ScheduleFinalizeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
