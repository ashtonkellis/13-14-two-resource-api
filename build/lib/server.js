'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopServer = exports.startServer = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _movieRouter = require('../router/movie-router');

var _movieRouter2 = _interopRequireDefault(_movieRouter);

var _dinosaurRouter = require('../router/dinosaur-router');

var _dinosaurRouter2 = _interopRequireDefault(_dinosaurRouter);

var _errorMiddleware = require('./middleware/error-middleware');

var _errorMiddleware2 = _interopRequireDefault(_errorMiddleware);

var _loggerMiddleware = require('./middleware/logger-middleware');

var _loggerMiddleware2 = _interopRequireDefault(_loggerMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// middleware
var app = (0, _express2.default)();
var PORT = process.env.PORT || 3000;
var server = null;

// third party apps
app.use((0, _cors2.default)());
app.use(_express2.default.urlencoded({ extended: true }));
app.use(_express2.default.json());

// our own modules
app.use(_loggerMiddleware2.default);

app.use(_movieRouter2.default);
app.use(_dinosaurRouter2.default);

app.use(_errorMiddleware2.default);

// catch all
app.all('*', function (request, response) {
  console.log('Returning a 404 from the catch/all route'); // eslint-disable-line
  return response.sendStatus(404).send('Route Not Registered');
});

var startServer = function startServer() {
  return _mongoose2.default.connect(process.env.MONGODB_URI).then(function () {
    server = app.listen(PORT, function () {
      console.log('Server up:', PORT); // eslint-disable-line
    });
  }).catch(function (err) {
    throw err;
  });
};

var stopServer = function stopServer() {
  return _mongoose2.default.disconnect().then(function () {
    server.close(function () {
      _logger2.default.log(_logger2.default.INFO, 'Server is off');
    });
  }).catch(function (err) {
    throw err;
  });
};

exports.startServer = startServer;
exports.stopServer = stopServer;