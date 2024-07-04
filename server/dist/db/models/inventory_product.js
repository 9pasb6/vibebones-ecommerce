"use strict";
// models/AdExpression.ts
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
class InventoryProduct extends Model {
}
InventoryProduct.init({
    product_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
    },
    cart_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'inventories',
            key: 'id',
        },
    },
}, {
    sequelize,
    paranoid: false,
    timestamps: false,
    modelName: 'inventory_products', // Adjust the model name as per your preference
    freezeTableName: true,
});
exports.default = InventoryProduct;
//# sourceMappingURL=inventory_product.js.map