/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/schedules              ->  index
 * POST    /api/schedules              ->  create
 * GET     /api/schedules/:id          ->  show
 * PUT     /api/schedules/:id          ->  update
 * DELETE  /api/schedules/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Schedule from './schedule.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Schedules
export function index(req, res) {
  Schedule.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Schedule from the DB
export function show(req, res) {
  Schedule.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Schedule in the DB
export function create(req, res) {
  Schedule.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Schedule in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Schedule.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Schedule from the DB
export function destroy(req, res) {
  Schedule.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
