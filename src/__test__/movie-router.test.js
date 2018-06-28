'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Movie from '../model/movie';
import createMockMoviePromise from './lib/movieMock';

const apiUrl = `http://localhost:${process.env.PORT}/api/movies`;

beforeAll(startServer);
afterAll(stopServer);
afterEach(() => Movie.remove({}));

describe('POST /api/movies', () => {
  const mockResource = {
    name: faker.lorem.words(2),
    director: faker.lorem.words(2),
  };

  test('200 POST for successful post of a movie', () => {
    return superagent.post(apiUrl)
      .send(mockResource)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(mockResource.name);
        expect(response.body._id).toBeTruthy();
      })
      .catch((err) => {
        throw err;
      });
  });
});

describe('GET /api/movies', () => {
  test('200 GET for successful fetching of a movie', () => {
    let returnedMovie;
    return createMockMoviePromise()
      .then((newMovie) => {
        returnedMovie = newMovie;
        return superagent.get(`${apiUrl}/${newMovie._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(returnedMovie.name);
      })
      .catch((err) => {
        throw err;
      });
  });
});
