"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
class Purchase extends Model {
}
Purchase.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
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
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
}, {
    sequelize,
    paranoid: false,
    timestamps: false,
    modelName: 'purchases',
    freezeTableName: true,
});
exports.default = Purchase;
//# sourceMappingURL=purchase.js.map