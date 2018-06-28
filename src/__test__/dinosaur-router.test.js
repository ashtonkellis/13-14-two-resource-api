'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Movie from '../model/movie';
import Dinosaur from '../model/dinosaur';
import createMockDataPromise from './lib/dinosaurMock';

const apiUrl = `http://localhost:${process.env.PORT}/api/dinosaurs`;

beforeAll(startServer);
afterAll(stopServer);
afterEach(() => {
  Promise.all([
    Movie.remove({}),
    Dinosaur.remove({}),
  ]);
});

describe('POST /api/dinosaurs', () => {
  test('200 POST for succcesful posting of a dinosaur', () => {
    return createMockDataPromise()
      .then((mockData) => {
        const mockDinosaur = {
          name: faker.name.firstName(),
          species: faker.lorem.words(2),
          eatsMeat: faker.random.boolean(),
          eatsPlants: faker.random.boolean(),
          movieId: mockData.movie._id,
        };

        return superagent.post(apiUrl)
          .send(mockDinosaur)
          .then((response) => {
            expect(response.status).toEqual(200);
          })
          .catch((err) => {
            throw err;
          });
      });
  });
});

describe('GET /api/dinosaurs', () => {
  test('200 GET for succesful fetching of a dinosaur', () => {
    return createMockDataPromise()
      .then((mockData) => {
        return superagent.get(`${apiUrl}/${mockData.dinosaur._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
      })
      .catch((err) => {
        throw err;
      });
  });
});
