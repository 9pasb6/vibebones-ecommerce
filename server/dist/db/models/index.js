"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const process_1 = require("process");
// import setupAssociations from '../associations'; // Ajusta la ruta según sea necesario
const basename = path_1.default.basename(__filename);
const env = process_1.env.NODE_ENV || 'development';
const config = require('../../config/config.ts')[env];
const db = {};
let sequelize;
if (config.use_env_variable) {
    sequelize = new sequelize_1.Sequelize(process_1.env[config.use_env_variable], config);
}
else {
    sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, config);
}
// Cargar modelos
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    return (file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.ts' &&
        file.indexOf('.test.ts') === -1);
})
    .forEach((file) => {
    const model = require(path_1.default.join(__dirname, file)).default;
    if (model && model.name) {
        const modelName = model.name.charAt(0) + model.name.slice(1);
        db[modelName] = model;
    }
    else {
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
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
module.exports = db;
//# sourceMappingURL=index.js.map