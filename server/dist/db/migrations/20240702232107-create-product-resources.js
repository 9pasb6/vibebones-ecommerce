// migrations/20240702143000-create-product-resources.ts
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
            yield queryInterface.createTable('product_resources', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: sequelize_1.DataTypes.INTEGER,
                },
                product_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'products',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                file_name: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                url: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                width: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                },
                height: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                },
                size: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                },
                resource_type: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                public_id: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                },
                createdAt: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: sequelize_1.DataTypes.DATE,
                },
                deletedAt: {
                    type: sequelize_1.DataTypes.DATE,
                },
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('product_resources');
        });
    }
};
//# sourceMappingURL=20240702232107-create-product-resources.js.map