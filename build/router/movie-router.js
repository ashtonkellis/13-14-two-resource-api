'use strict';

// import { Mongoose } from 'mongoose';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _movie = require('../model/movie');

var _movie2 = _interopRequireDefault(_movie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var createError = require('http-errors')
// var express = require('express')
// var app = express()

// app.use(function (req, res, next) {
//   if (!req.user) return next(createError(401, 'Please login to view this page.'))
//   next()
// })

var movieRouter = new _express.Router();

movieRouter.post('/api/movies', function (request, response, next) {
  _movie2.default.init().then(function () {
    _logger2.default.log(_logger2.default.INFO, 'MOVIE ROUTER BEFORE SAVE: Saved a new movie ' + JSON.stringify(request.body));
    return new _movie2.default(request.body).save();
  }).then(function (newMovie) {
    _logger2.default.log(_logger2.default.INFO, 'MOVIE ROUTER AFTER SAVE: Saved a new movie ' + JSON.stringify(newMovie));
    return response.json(newMovie);
  }).catch(next);
});

movieRouter.get('/api/movies/:id?', function (request, response, next) {
  _movie2.default.init().then(function () {
    return _movie2.default.findOne({ _id: request.params.id });
  }).then(function (foundMovie) {
    _logger2.default.log(_logger2.default.INFO, 'MOVIE ROUTER: FOUND THE MODEL, ' + JSON.stringify(foundMovie));
    response.json(foundMovie);
  }).catch(next);
});

movieRouter.put('/api/movies/:id?', function (request, response, next) {
  if (JSON.stringify(request.body).length <= 2) return next((0, _httpErrors2.default)(400, 'Not found'));

  _movie2.default.init().then(function () {
    _logger2.default.log(_logger2.default.INFO, 'MOVIE ROUTER BEFORE PUT: Updating movie ' + JSON.stringify(request.body));

    var options = {
      new: true,
      runValidators: true
    };

    return _movie2.default.findByIdAndUpdate(request.params.id, request.body, options);
  }).then(function (updatedMovie) {
    _logger2.default.log(_logger2.default.INFO, 'MOVIE ROUTER AFTER PUT: Updated movie details ' + JSON.stringify(updatedMovie));
    return response.json(updatedMovie);
  }).catch(next);
  return undefined;
});

movieRouter.delete('/api/movies/:id?', function (request, response, next) {
  _movie2.default.init().then(function () {
    _logger2.default.log(_logger2.default.INFO, 'MOVIE ROUTER BEFORE DELETE: Deleting movie #' + request.params.id);
    return _movie2.default.findByIdAndRemove(request.params.id);
  }).then(function (data) {
    return response.status(204).json(data);
  }).catch(next);
});

exports.default = movieRouter;