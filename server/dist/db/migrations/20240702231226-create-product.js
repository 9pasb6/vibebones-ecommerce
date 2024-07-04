// migrations/20240702140500-create-products.ts
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable('products', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: sequelize_1.DataTypes.INTEGER,
                },
                title: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                description: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                price: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                },
                stock: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                },
                tax: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                },
                category_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'categories', // Asegúrate que coincida con el nombre de tu tabla de categorías
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                date: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                status: {
                    type: sequelize_1.DataTypes.BOOLEAN,
                    allowNull: false,
                },
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('products');
        });
    }
};
//# sourceMappingURL=20240702231226-create-product.js.map