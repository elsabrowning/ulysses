'use strict';

describe('Service: schedule', function () {

  // load the service's module
  beforeEach(module('ulyssesApp'));

  // instantiate service
  var schedule;
  beforeEach(inject(function (_Schedule_) {
    schedule = _Schedule_;
  }));

  it('should do something', function () {
    expect(!!schedule).toBe(true);
  });

});
