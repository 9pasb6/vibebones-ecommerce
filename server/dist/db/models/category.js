"use strict";
// models/Category.ts
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = require('../../config/database');
class Category extends sequelize_1.Model {
}
Category.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize,
    modelName: 'categories', // Adjust the model name as per your preference
    timestamps: false,
});
exports.default = Category;
//# sourceMappingURL=category.js.map