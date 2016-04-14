'use strict';
var config = browser.params;

describe('Schedule Edit', function() {
  var page;

  beforeEach(function() {
    browser.get(config.baseUrl + '/schedule/edit');
    page = require('./schedule.edit.po.js');
  });

  it('URL test', function() {
    expect(browser.getCurrentUrl()).toBe(config.baseUrl + '/schedule/edit'); //1
    //expect(page.panelBody.getText()).toBe('There are currently no jobs.'); //2
  });
});
