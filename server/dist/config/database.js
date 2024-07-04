"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];
const sequelize = new sequelize_1.Sequelize(config);
module.exports = sequelize;
//# sourceMappingURL=database.js.map