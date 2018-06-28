'use strict';

import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  director: {
    type: String,
    required: true,
  },
  dinosaurs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'dinosaurs',
    },
  ],
}, { timestamps: true });

function moviesPreHook(done) {
  this.populate('dinosaurs');
  done();
}

movieSchema.pre('findOne', moviesPreHook);

const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('movies', movieSchema, 'movies', skipInit);
