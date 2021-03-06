'use strict';

import util from 'util';
import fs from 'fs';

const readDirectoryPromise = util.promisify(fs.readdir);
const modelPath = `${__dirname}`;

export default () => {
  return readDirectoryPromise(modelPath)
    .then((files) => {
      const newFiles = files.filter(file => file !== 'index.js').map(file => `./${file}`);
      const modelMap = newFiles.reduce((storage, currentFile) => {
        const file = require(currentFile) /*eslint-disable-line*/
        const isMongooseModel = file.default && file.default.modelName;
        const modelName = isMongooseModel ? file.default.modelName : currentFile;
        storage[modelName] = file;
        return storage;
      }, {});
      return modelMap;
    })
    .catch((err) => {
      throw err;
    });
};
