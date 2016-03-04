'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var scheduleCtrlStub = {
  index: 'scheduleCtrl.index',
  show: 'scheduleCtrl.show',
  create: 'scheduleCtrl.create',
  update: 'scheduleCtrl.update',
  destroy: 'scheduleCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var scheduleIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './schedule.controller': scheduleCtrlStub
});

describe('Schedule API Router:', function() {

  it('should return an express router instance', function() {
    scheduleIndex.should.equal(routerStub);
  });

  describe('GET /api/schedules', function() {

    it('should route to schedule.controller.index', function() {
      routerStub.get
        .withArgs('/', 'scheduleCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/schedules/:id', function() {

    it('should route to schedule.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'scheduleCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/schedules', function() {

    it('should route to schedule.controller.create', function() {
      routerStub.post
        .withArgs('/', 'scheduleCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/schedules/:id', function() {

    it('should route to schedule.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'scheduleCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/schedules/:id', function() {

    it('should route to schedule.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'scheduleCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/schedules/:id', function() {

    it('should route to schedule.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'scheduleCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
