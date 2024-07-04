"use strict";
// models/AdExpression.ts
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
class CartProduct extends Model {
}
CartProduct.init({
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
            model: 'carts',
            key: 'id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    paranoid: false,
    timestamps: false,
    modelName: 'cart_products', // Adjust the model name as per your preference
    freezeTableName: true,
});
exports.default = CartProduct;
//# sourceMappingURL=cart_product.js.map