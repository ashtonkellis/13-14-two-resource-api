'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _dinosaur = require('../../model/dinosaur');

var _dinosaur2 = _interopRequireDefault(_dinosaur);

var _movieMock = require('./movieMock');

var _movieMock2 = _interopRequireDefault(_movieMock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var mockData = {};
  return (0, _movieMock2.default)().then(function (newMovie) {
    mockData.movie = newMovie;
  }).then(function () {
    var mockDinosaur = {
      name: _faker2.default.name.firstName(),
      species: _faker2.default.lorem.words(2),
      eatsMeat: _faker2.default.random.boolean(),
      eatsPlants: _faker2.default.random.boolean(),
      movieId: mockData.movie._id
    };
    return new _dinosaur2.default(mockDinosaur).save();
  }).then(function (newDinosaur) {
    mockData.dinosaur = newDinosaur;
    return mockData;
  }).catch(function (err) {
    throw err;
  });
};