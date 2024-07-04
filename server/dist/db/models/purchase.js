"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
class Purchase extends Model {
}
Purchase.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    cart_id: {
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
    total_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    paranoid: false,
    timestamps: false,
    modelName: 'purchases', // Ajusta el nombre del modelo según tu preferencia
    freezeTableName: true,
});
exports.default = Purchase;
//# sourceMappingURL=purchase.js.map