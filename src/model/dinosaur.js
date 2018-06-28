'use strict';

import mongoose from 'mongoose';
import Movie from './movie';


const dinosaurSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  eatsMeat: {
    type: Boolean,
    required: true,
  },
  eatsPlants: {
    type: Boolean,
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
}, { timestamps: true });

const skipInit = process.env.NODE_ENV === 'development';

export default mongoose.model('dinosaurs', dinosaurSchema, 'dinosaurs', skipInit);

function dinosaurPreSaveHook(done) {
  return Movie.findById(this.movieId)
    .then((foundMovie) => {
      foundMovie.dinosaurs.push(this._id);
      return foundMovie.save();
    })
    .then(() => {
      done();
    })
    .catch(done);
}

const dinosaurPostRemoveHook = (document, done) => {
  return Movie.findById(document.movieId)
    .then((foundMovie) => {
      foundMovie.dinosaurs = foundMovie.dinosaurs.filter(dinosaur => dinosaur._id.toString() !== document._id.toString());
    })
    .then(() => done())
    .catch(done);
};

dinosaurSchema.pre('save', dinosaurPreSaveHook);
dinosaurSchema.post('remove', dinosaurPostRemoveHook);
