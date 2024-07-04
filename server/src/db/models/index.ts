"use strict";

import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import { env as processEnv } from 'process';
// import setupAssociations from '../associations'; // Ajusta la ruta según sea necesario

const basename = path.basename(__filename);
const env = processEnv.NODE_ENV || 'development';
const config = require('../../config/config.ts')[env];
const db: any = {};

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(processEnv[config.use_env_variable]!, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Cargar modelos
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default;
    if (model && model.name) {
      const modelName = model.name.charAt(0) + model.name.slice(1);
      db[modelName] = model;
    } else {
      console.error(`Error al cargar el modelo desde el archivo: ${file}`);
    }
  });

console.log("Modelos cargados correctamente:", (db));

// Import associations
require("../associations")(db);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
// Asignar instancias de Sequelize al objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
module.exports = db;