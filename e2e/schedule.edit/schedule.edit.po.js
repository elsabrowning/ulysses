'use strict';

var scheduleEditPage = function() {
  this.container = element(by.css('.schedule.edit-container'));
  this.panelBody = this.container.element(by.css('.panel-body'));
};

module.exports = new scheduleEditPage();
