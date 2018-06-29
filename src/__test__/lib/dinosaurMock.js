import faker from 'faker';
import Dinosaur from '../../model/dinosaur';
import movieMockPromise from './movieMock';

export default () => {
  const mockData = {};
  return movieMockPromise()
    .then((newMovie) => {
      mockData.movie = newMovie;
    })
    .then(() => {
      const mockDinosaur = {
        name: faker.name.firstName(),
        species: faker.lorem.words(2),
        eatsMeat: faker.random.boolean(),
        eatsPlants: faker.random.boolean(),
        movieId: mockData.movie._id,
      };
      return new Dinosaur(mockDinosaur).save();
    })
    .then((newDinosaur) => {
      mockData.dinosaur = newDinosaur;
      return mockData;
    })
    .catch((err) => {
      throw err;
    });
};
