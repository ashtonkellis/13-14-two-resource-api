'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _movie = require('../../model/movie');

var _movie2 = _interopRequireDefault(_movie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var mockResouceToPost = {
    name: _faker2.default.lorem.words(2),
    director: _faker2.default.lorem.words(2)
  };
  return new _movie2.default(mockResouceToPost).save();
};