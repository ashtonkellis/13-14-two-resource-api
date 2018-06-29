'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _server = require('../lib/server');

var _movie = require('../model/movie');

var _movie2 = _interopRequireDefault(_movie);

var _movieMock = require('./lib/movieMock');

var _movieMock2 = _interopRequireDefault(_movieMock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = 'http://localhost:' + process.env.PORT + '/api/movies';

beforeAll(_server.startServer);
afterAll(_server.stopServer);
afterEach(function () {
  return _movie2.default.remove({});
});

describe('POST /api/movies', function () {
  var mockResource = {
    name: _faker2.default.lorem.words(2),
    director: _faker2.default.lorem.words(2)
  };

  test('200 POST for successful post of a movie', function () {
    return _superagent2.default.post(apiUrl).send(mockResource).then(function (response) {
      expect(response.status).toEqual(200);
      expect(response.body.name).toEqual(mockResource.name);
      expect(response.body._id).toBeTruthy();
    }).catch(function (err) {
      throw err;
    });
  });

  test('400 POST for bad request if no request body was provided', function () {
    return _superagent2.default.post(apiUrl).then(function (response) {
      throw response;
    }).catch(function (err) {
      expect(err.status).toBe(400);
    });
  });
});

describe('GET /api/movies', function () {
  test('200 GET for successful fetching of a movie', function () {
    var savedMovie = void 0;
    return (0, _movieMock2.default)().then(function (newMovie) {
      savedMovie = newMovie;
      return _superagent2.default.get(apiUrl + '/' + newMovie._id);
    }).then(function (response) {
      expect(response.status).toEqual(200);
      expect(response.body.name).toEqual(savedMovie.name);
      expect(response.body.director).toEqual(savedMovie.director);
    }).catch(function (err) {
      throw err;
    });
  });

  test('404 GET for valid request made with an id that was not found', function () {
    return _superagent2.default.get(apiUrl + '/"5b345f9d1086d2149c26d370"').then(function (response) {
      throw response;
    }).catch(function (err) {
      expect(err.status).toBe(404);
    });
  });
});

describe('PUT /api/movies', function () {
  var mockMovieForUpdate = {
    name: 'Ashton Movie',
    director: 'Ashton'
  };

  test('200 PUT for successful update of a resource', function () {
    var savedMovie = void 0;
    return (0, _movieMock2.default)().then(function (newMovie) {
      savedMovie = newMovie;
      return _superagent2.default.put(apiUrl + '/' + newMovie._id).send(mockMovieForUpdate);
    }).then(function (response) {
      expect(response.status).toBe(200);
      expect(response.body._id.toString()).toBe(savedMovie._id.toString());
      expect(response.body.name).toBe(mockMovieForUpdate.name);
      expect(response.body.director).toBe(response.body.director);
    }).catch(function (err) {
      throw err;
    });
  });

  test('400 PUT if no request body was provided', function () {
    return (0, _movieMock2.default)().then(function (newMovie) {
      return _superagent2.default.put(apiUrl + '/' + newMovie._id).then(function (response) {
        throw response;
      }).catch(function (err) {
        expect(err.status).toBe(400);
      });
    });
  });

  test('404 PUT for valid request made with an id that was not found', function () {
    return _superagent2.default.put(apiUrl + '/123').send(mockMovieForUpdate).then(function (results) {
      throw results;
    }).catch(function (err) {
      expect(err.status).toBe(404);
    });
  });
});

describe('DELETE /api/movies', function () {
  test('204 DELETE for a successful delete', function () {
    return (0, _movieMock2.default)().then(function (newMovie) {
      return _superagent2.default.delete(apiUrl + '/' + newMovie._id);
    }).then(function (response) {
      expect(response.status).toBe(204);
    }).catch(function (err) {
      throw err;
    });
  });

  test('404 DELETE for valid request with an id that was not found', function () {
    return _superagent2.default.delete(apiUrl + '/123').then(function (results) {
      throw results;
    }).catch(function (err) {
      expect(err.status).toBe(404);
    });
  });
});