"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
class ProductCategory extends Model {
}
ProductCategory.init({
    product_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
    },
    category_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id',
        },
    },
}, {
    sequelize,
    paranoid: false,
    timestamps: false,
    modelName: 'product_category',
    freezeTableName: true,
});
exports.default = ProductCategory;
//# sourceMappingURL=product_category.js.map