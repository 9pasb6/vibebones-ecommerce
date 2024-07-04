"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
class Inventory extends Model {
}
Inventory.init({
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.STRING,
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
}, {
    sequelize,
    paranoid: false,
    timestamps: false,
    modelName: 'inventories',
    freezeTableName: true,
});
exports.default = Inventory;
//# sourceMappingURL=inventory.js.map