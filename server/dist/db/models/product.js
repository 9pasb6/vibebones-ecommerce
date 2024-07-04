"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
class Product extends Model {
}
Product.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tax: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id',
        },
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize,
    paranoid: false,
    timestamps: false,
    modelName: 'products',
    freezeTableName: true,
});
exports.default = Product;
//# sourceMappingURL=product.js.map