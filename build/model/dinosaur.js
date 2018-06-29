'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _movie = require('./movie');

var _movie2 = _interopRequireDefault(_movie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dinosaurSchema = _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  eatsMeat: {
    type: Boolean,
    required: true
  },
  eatsPlants: {
    type: Boolean,
    required: true
  },
  movieId: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true });

var skipInit = process.env.NODE_ENV === 'development';

exports.default = _mongoose2.default.model('dinosaurs', dinosaurSchema, 'dinosaurs', skipInit);


function dinosaurPreSaveHook(done) {
  var _this = this;

  return _movie2.default.findById(this.movieId).then(function (foundMovie) {
    foundMovie.dinosaurs.push(_this._id);
    return foundMovie.save();
  }).then(function () {
    done();
  }).catch(done);
}

var dinosaurPostRemoveHook = function dinosaurPostRemoveHook(document, done) {
  return _movie2.default.findById(document.movieId).then(function (foundMovie) {
    foundMovie.dinosaurs = foundMovie.dinosaurs.filter(function (dinosaur) {
      return dinosaur._id.toString() !== document._id.toString();
    });
  }).then(function () {
    return done();
  }).catch(done);
};

dinosaurSchema.pre('save', dinosaurPreSaveHook);
dinosaurSchema.post('remove', dinosaurPostRemoveHook);