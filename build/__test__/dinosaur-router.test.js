'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _server = require('../lib/server');

var _movie = require('../model/movie');

var _movie2 = _interopRequireDefault(_movie);

var _dinosaur = require('../model/dinosaur');

var _dinosaur2 = _interopRequireDefault(_dinosaur);

var _dinosaurMock = require('./lib/dinosaurMock');

var _dinosaurMock2 = _interopRequireDefault(_dinosaurMock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = 'http://localhost:' + process.env.PORT + '/api/dinosaurs';

beforeAll(_server.startServer);
afterAll(_server.stopServer);
afterEach(function (done) {
  Promise.all([_movie2.default.remove({}), _dinosaur2.default.remove({})]);
  done();
});

describe('POST /api/dinosaurs', function () {
  test('200 POST for succcesful posting of a dinosaur', function () {
    return (0, _dinosaurMock2.default)().then(function (mockData) {
      var mockDinosaur = {
        name: _faker2.default.name.firstName(),
        species: _faker2.default.lorem.words(2),
        eatsMeat: _faker2.default.random.boolean(),
        eatsPlants: _faker2.default.random.boolean(),
        movieId: mockData.movie._id
      };

      return _superagent2.default.post(apiUrl).send(mockDinosaur).then(function (response) {
        expect(response.status).toEqual(200);
      }).catch(function (err) {
        throw err;
      });
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

describe('GET /api/dinosaurs', function () {
  test('200 GET for succesful fetching of a dinosaur', function () {
    var savedDinosaur = void 0;
    return (0, _dinosaurMock2.default)().then(function (mockData) {
      savedDinosaur = mockData.dinosaur;
      return _superagent2.default.get(apiUrl + '/' + mockData.dinosaur._id);
    }).then(function (response) {
      expect(response.status).toEqual(200);
      expect(response.body.name).toEqual(savedDinosaur.name);
      expect(response.body.species).toEqual(savedDinosaur.species);
      expect(response.body.eatsMeat).toEqual(savedDinosaur.eatsMeat);
      expect(response.body.eatsPlants).toEqual(savedDinosaur.eatsPlants);
    }).catch(function (err) {
      throw err;
    });
  });

  test('404 GET for valid request made with an id that is not found', function () {
    return _superagent2.default.get(apiUrl + '/123').then(function (results) {
      throw results;
    }).catch(function (err) {
      expect(err.status).toBe(404);
    });
  });
});

describe('PUT /api/dinosaurs', function () {
  var mockDinosaurForUpdate = {
    name: 'Little Foot',
    species: 'Long Neck',
    eatsPlants: true,
    eatsMeat: true
  };

  test('200 PUT for successful update of a resource', function () {
    return (0, _dinosaurMock2.default)().then(function (data) {
      return _superagent2.default.put(apiUrl + '/' + data.dinosaur._id).send(mockDinosaurForUpdate);
    }).then(function (response) {
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(mockDinosaurForUpdate.name);
      expect(response.body.species).toBe(mockDinosaurForUpdate.species);
      expect(response.body.eatsPlants).toBe(mockDinosaurForUpdate.eatsPlants);
      expect(response.body.eatsMeat).toBe(mockDinosaurForUpdate.eatsMeat);
    }).catch(function (err) {
      throw err;
    });
  });

  test('400 PUT if no request body was provided', function () {
    return (0, _dinosaurMock2.default)().then(function (data) {
      return _superagent2.default.put(apiUrl + '/' + data.dinosaur._id);
    }).then(function (response) {
      throw response;
    }).catch(function (err) {
      expect(err.status).toBe(400);
    });
  });

  test('404 PUT for a valid request made with an id that was not found', function () {
    return _superagent2.default.put(apiUrl + '/123').send(mockDinosaurForUpdate).then(function (response) {
      throw response;
    }).catch(function (err) {
      expect(err.status).toBe(404);
    });
  });
});

describe('DELETE /api/dinosaurs', function () {
  test('204 DELETE for a successful delete', function () {
    return (0, _dinosaurMock2.default)().then(function (data) {
      return _superagent2.default.delete(apiUrl + '/' + data.dinosaur._id);
    }).then(function (response) {
      expect(response.status).toBe(204);
    }).catch(function (err) {
      throw err;
    });
  });
});