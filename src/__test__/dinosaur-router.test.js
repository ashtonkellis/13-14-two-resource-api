'use strict';

import superagent from 'superagent';
// import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Movie from '../model/movie';
import Dinosaur from '../model/dinosaur';
import createMockDinosaur from './lib/dinosaurMock';

const apiUrl = `http://localhost:${process.env.PORT}/api/dinosaurs`;

beforeAll(startServer);
afterAll(stopServer);

afterEach((done) => {
  Promise.all([
    Movie.remove({}),
    Dinosaur.remove({}),
  ]);
  done();
});

// describe('POST /api/students', () => {
//   test('200 POST for succcesful posting of a student', () => {
//     return createMockDataPromise()
//       .then((mockData) => {
//         const mockStudent = {
//           first: faker.name.firstName(),
//           last: faker.name.lastName(),
//           classRoomId: mockData.classRoom._id,
//         };

//         return superagent.post(apiUrl)
//           .send(mockStudent)
//           .then((response) => {
//             expect(response.status).toEqual(200);
//           })
//           .catch((err) => {
//             throw err;
//           });
//       });
//   });
// });

describe('POST /api/dinosaurs', () => {
  // test('200 POST for succcesful posting of a dinosaur', () => {
  //   return createMockDinosaur()
  //     .then((mockData) => {
  //       const newMockDinosaur = {
  //         name: faker.name.firstName(),
  //         species: faker.lorem.words(2),
  //         eatsPlants: faker.random.boolean(),
  //         eatsMeat: faker.random.boolean(),
  //         movieId: mockData.movie._id,
  //       };

  //       console.log(newMockDinosaur, 'MOCK DINOSAUR');
  //       return superagent.post(apiUrl)
  //         .send(newMockDinosaur)
  //         .then((response) => {
  //           expect(response.status).toEqual(200);
  //         })
  //         .catch((err) => {
  //           throw err;
  //         });
  //     });
  // });

  test('400 POST for bad request if no request body was provided', () => {
    return superagent.post(apiUrl)
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toBe(400);
      });
  });
});

describe('GET /api/dinosaurs', () => {
  test('200 GET for succesful fetching of a dinosaur', () => {
    let savedDinosaur;
    return createMockDinosaur()
      .then((mockData) => {
        savedDinosaur = mockData.dinosaur;
        return superagent.get(`${apiUrl}/${mockData.dinosaur._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(savedDinosaur.name);
        expect(response.body.species).toEqual(savedDinosaur.species);
        expect(response.body.eatsMeat).toEqual(savedDinosaur.eatsMeat);
        expect(response.body.eatsPlants).toEqual(savedDinosaur.eatsPlants);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('404 GET for valid request made with an id that is not found', () => {
    return superagent.get(`${apiUrl}/123`)
      .then((results) => {
        throw results;
      })
      .catch((err) => {
        expect(err.status).toBe(404);
      });
  });
});

describe('PUT /api/dinosaurs', () => {
  const mockDinosaurForUpdate = {
    name: 'Little Foot',
    species: 'Long Neck',
    eatsPlants: true,
    eatsMeat: true,
  };

  test('200 PUT for successful update of a resource', () => {
    return createMockDinosaur()
      .then((data) => {
        return superagent.put(`${apiUrl}/${data.dinosaur._id}`)
          .send(mockDinosaurForUpdate);
      })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(mockDinosaurForUpdate.name);
        expect(response.body.species).toBe(mockDinosaurForUpdate.species);
        expect(response.body.eatsPlants).toBe(mockDinosaurForUpdate.eatsPlants);
        expect(response.body.eatsMeat).toBe(mockDinosaurForUpdate.eatsMeat);
      })
      .catch((err) => {
        throw err;
      });
  });

  test('400 PUT if no request body was provided', () => {
    return createMockDinosaur()
      .then((data) => {
        return superagent.put(`${apiUrl}/${data.dinosaur._id}`);
      })
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toBe(400);
      });
  });

  test('404 PUT for a valid request made with an id that was not found', () => {
    return superagent.put(`${apiUrl}/123`)
      .send(mockDinosaurForUpdate)
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toBe(404);
      });
  });
});

describe('DELETE /api/dinosaurs', () => {
  test('204 DELETE for a successful delete', () => {
    return createMockDinosaur()
      .then((data) => {
        return superagent.delete(`${apiUrl}/${data.dinosaur._id}`);
      })
      .then((response) => {
        expect(response.status).toBe(204);
      })
      .catch((err) => {
        throw err;
      });
  });
});
