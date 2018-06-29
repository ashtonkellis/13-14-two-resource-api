'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _server = require('../lib/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = 'http://localhost:' + process.env.PORT + '/api/BADPATH!!';

beforeAll(_server.startServer);
afterAll(_server.stopServer);

describe('Catchall route', function () {
  test('404 on bad path', function () {
    return _superagent2.default.get(apiUrl).then(function (response) {
      throw response;
    }).catch(function (err) {
      expect(err.status).toEqual(404);
    });
  });
});