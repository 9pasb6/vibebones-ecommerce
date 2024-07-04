"use strict";
// models/AdResource.ts
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
class ProductResource extends Model {
}
ProductResource.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    width: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    resource_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    public_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    deletedAt: {
        type: DataTypes.DATE,
    },
}, {
    sequelize,
    modelName: 'product_resources', // Adjust the model name as per your preference
    timestamps: true,
    paranoid: true,
});
exports.default = ProductResource;
//# sourceMappingURL=product_resources.js.map