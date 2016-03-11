'use strict';

describe('Controller: ScheduleInputCtrl', function () {

  // load the controller's module
  beforeEach(module('ulyssesApp'));

  var ScheduleInputCtrl, scope;

  // Awww yeah, it's biiig papa
  var FakePapa = {
    parse: function() {
      return 'lol I ate your data';
    }
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScheduleInputCtrl = $controller('ScheduleInputCtrl', {
      $scope: scope,
      papa: FakePapa
    });

    spyOn(FakePapa, 'parse');
  }));

  it('should call the process function correctly', function () {
    scope.volunteerCSV = 'lol this is data';
    scope.process();

    expect(FakePapa.parse).toHaveBeenCalled();
  });
});
