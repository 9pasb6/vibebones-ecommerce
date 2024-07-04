"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
class Cart extends Model {
}
Cart.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
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
        allowNull: true,
    },
}, {
    sequelize,
    paranoid: true,
    modelName: 'carts', // Adjust the model name as per your preference
    timestamps: true,
});
exports.default = Cart;
//# sourceMappingURL=cart.js.map