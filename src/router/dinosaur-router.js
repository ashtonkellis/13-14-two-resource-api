
import { Router } from 'express';
import createError from 'http-errors';
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
    return next(createError(400, 'Did not enter and ID'));
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

dinosaurRouter.put('/api/dinosaurs/:id?', (request, response, next) => {
  if (JSON.stringify(request.body).length <= 2) return next(createError(400, 'Not Found'));
  
  Dinosaur.init()
    .then(() => {
      // error checking
      logger.log(logger.INFO, `DINOSAUR ROUTER BEFORE PUT: Updating dinosaur ${JSON.stringify(request.body)}`);

      const options = {
        new: true,
        runValidators: true,
      };

      return Dinosaur.findByIdAndUpdate(request.params.id, request.body, options);
    })
    .then((updatedDinosaur) => {
      logger.log(logger.INFO, `MOVIE ROUTER AFTER PUT: Updated dinosaur details ${JSON.stringify(updatedDinosaur)}`);
      return response.json(updatedDinosaur);
    })
    .catch(next);
  return undefined;
});

dinosaurRouter.delete('/api/dinosaurs/:id?', (request, response, next) => {
  Dinosaur.init()
    .then(() => {
      logger.log(logger.INFO, `DINOSAUR ROUTER BEFORE DELETE: Deleting dinosaur ${JSON.stringify(request.params)}`);

      return Dinosaur.findOneAndRemove(request.params.id);
    })
    .then((data) => {
      return response.status(204).json(data);
    })
    .catch(next);
});

export default dinosaurRouter;
