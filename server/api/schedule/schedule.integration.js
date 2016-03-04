'use strict';

var app = require('../..');
import request from 'supertest';

var newSchedule;

describe('Schedule API:', function() {

  describe('GET /api/schedules', function() {
    var schedules;

    beforeEach(function(done) {
      request(app)
        .get('/api/schedules')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          schedules = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      schedules.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/schedules', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/schedules')
        .send({
          name: 'New Schedule',
          info: 'This is the brand new schedule!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSchedule = res.body;
          done();
        });
    });

    it('should respond with the newly created schedule', function() {
      newSchedule.name.should.equal('New Schedule');
      newSchedule.info.should.equal('This is the brand new schedule!!!');
    });

  });

  describe('GET /api/schedules/:id', function() {
    var schedule;

    beforeEach(function(done) {
      request(app)
        .get('/api/schedules/' + newSchedule._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          schedule = res.body;
          done();
        });
    });

    afterEach(function() {
      schedule = {};
    });

    it('should respond with the requested schedule', function() {
      schedule.name.should.equal('New Schedule');
      schedule.info.should.equal('This is the brand new schedule!!!');
    });

  });

  describe('PUT /api/schedules/:id', function() {
    var updatedSchedule;

    beforeEach(function(done) {
      request(app)
        .put('/api/schedules/' + newSchedule._id)
        .send({
          name: 'Updated Schedule',
          info: 'This is the updated schedule!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSchedule = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSchedule = {};
    });

    it('should respond with the updated schedule', function() {
      updatedSchedule.name.should.equal('Updated Schedule');
      updatedSchedule.info.should.equal('This is the updated schedule!!!');
    });

  });

  describe('DELETE /api/schedules/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/schedules/' + newSchedule._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when schedule does not exist', function(done) {
      request(app)
        .delete('/api/schedules/' + newSchedule._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
