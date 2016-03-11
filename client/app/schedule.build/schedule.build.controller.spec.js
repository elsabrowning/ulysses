'use strict';

describe('Controller: ScheduleBuildCtrl', function () {

  // load the controller's module
  beforeEach(module('ulyssesApp'));

  var ScheduleBuildCtrl, scope;

  // Make a thing that pretends to be the schedule:
  var FakeSchedule = {
    get: function() {
      return {
        name: '',
        date: '',
        slots: new Array(12)
      }
    }
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $state) {
    scope = $rootScope.$new();
    ScheduleBuildCtrl = $controller('ScheduleBuildCtrl', {
      $scope: scope,
      $state: $state,
      $stateParams: {
        id: 'testinglol'
      },
      Schedule: FakeSchedule
    });
  }));

  it('should correctly populate the slot table', function () {
    expect(scope.schedule.slots.length).toBe(12);
  });
});
