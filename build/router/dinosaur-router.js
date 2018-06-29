'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _dinosaur = require('../model/dinosaur');

var _dinosaur2 = _interopRequireDefault(_dinosaur);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dinosaurRouter = new _express.Router();

dinosaurRouter.post('/api/dinosaurs', function (request, response, next) {
  _dinosaur2.default.init().then(function () {
    _logger2.default.log(_logger2.default.INFO, 'DINOSAUR ROUTER: POST BEFORE SAVE: ' + JSON.stringify(request.body));
    return new _dinosaur2.default(request.body).save();
  }).then(function (newDinosaur) {
    _logger2.default.log(_logger2.default.INFO, 'DINOSAUR ROUTER: POST AFTER SAVE: ' + JSON.stringify(newDinosaur));
    response.json(newDinosaur);
  }).catch(next);
});

dinosaurRouter.get('/api/dinosaurs/:id?', function (request, response, next) {
  if (!request.params.id) {
    return next((0, _httpErrors2.default)(400, 'Did not enter and ID'));
  }

  _dinosaur2.default.init().then(function () {
    return _dinosaur2.default.findOne({ _id: request.params.id });
  }).then(function (foundDinosaur) {
    _logger2.default.log(_logger2.default.INFO, 'DINOSAUR ROUTER: AFTER GETTING DINOSAUR ' + JSON.stringify(foundDinosaur));
    return response.json(foundDinosaur);
  }).catch(next);
  return undefined;
});

dinosaurRouter.put('/api/dinosaurs/:id?', function (request, response, next) {
  if (JSON.stringify(request.body).length <= 2) return next((0, _httpErrors2.default)(400, 'Not Found'));

  _dinosaur2.default.init().then(function () {
    // error checking
    _logger2.default.log(_logger2.default.INFO, 'DINOSAUR ROUTER BEFORE PUT: Updating dinosaur ' + JSON.stringify(request.body));

    var options = {
      new: true,
      runValidators: true
    };

    return _dinosaur2.default.findByIdAndUpdate(request.params.id, request.body, options);
  }).then(function (updatedDinosaur) {
    _logger2.default.log(_logger2.default.INFO, 'MOVIE ROUTER AFTER PUT: Updated dinosaur details ' + JSON.stringify(updatedDinosaur));
    return response.json(updatedDinosaur);
  }).catch(next);
  return undefined;
});

dinosaurRouter.delete('/api/dinosaurs/:id?', function (request, response, next) {
  _dinosaur2.default.init().then(function () {
    _logger2.default.log(_logger2.default.INFO, 'DINOSAUR ROUTER BEFORE DELETE: Deleting dinosaur ' + JSON.stringify(request.params));

    return _dinosaur2.default.findOneAndRemove(request.params.id);
  }).then(function (data) {
    return response.status(204).json(data);
  }).catch(next);
});

exports.default = dinosaurRouter;