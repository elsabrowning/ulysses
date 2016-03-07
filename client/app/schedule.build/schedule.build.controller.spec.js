'use strict';

describe('Controller: ScheduleBuildCtrl', function () {

  // load the controller's module
  beforeEach(module('ulyssesApp'));

  var ScheduleBuildCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScheduleBuildCtrl = $controller('ScheduleBuildCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
