
import { Router } from 'express';
import HttpErrors from 'http-errors';
import logger from '../lib/logger';
import Dinosaur from '../model/dinosaur';

const dinosaurRouter = new Router();

dinosaurRouter.post('/api/dinosaurs', (request, response, next) => {
  Dinosaur.init()
    .then(() => {
      logger.log(logger.INFO, `DINOSAUR ROUTER: POST BEFORE SAVE: ${JSON.stringify(request.body)}`);
      return new Dinosaur(request.body).save();
    })
    .then((newDinosaur) => {
      logger.log(logger.INFO, `DINOSAUR ROUTER: POST AFTER SAVE: ${JSON.stringify(newDinosaur)}`);
      response.json(newDinosaur);
    })
    .catch(next);
});

dinosaurRouter.get('/api/dinosaurs/:id?', (request, response, next) => {
  if (!request.params.id) {
    return next(new HttpErrors(400, 'Did not enter and ID'));
  }

  Dinosaur.init()
    .then(() => {
      return Dinosaur.findOne({ _id: request.params.id });
    })
    .then((foundDinosaur) => {
      logger.log(logger.INFO, `DINOSAUR ROUTER: AFTER GETTING DINOSAUR ${JSON.stringify(foundDinosaur)}`);
      return response.json(foundDinosaur);
    })
    .catch(next);
  return undefined;
});

export default dinosaurRouter;
