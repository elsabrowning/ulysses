'use strict';

var scheduleBuildPage = function() {
  this.container = element(by.css('.scheduleBuildPage-list-group'));
  this.panelBody = this.container.element(by.css('.panel-body'));
};

module.exports = new scheduleBuildPage();
