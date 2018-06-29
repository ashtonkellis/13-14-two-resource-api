'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var movieSchema = _mongoose2.default.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  director: {
    type: String,
    required: true
  },
  dinosaurs: [{
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: 'dinosaurs'
  }]
}, { timestamps: true });

function moviePreFindHook(done) {
  this.populate('dinosaurs');
  done();
}

movieSchema.pre('findOne', moviePreFindHook);

var skipInit = process.env.NODE_ENV === 'development';
exports.default = _mongoose2.default.model('movies', movieSchema, 'movies', skipInit);