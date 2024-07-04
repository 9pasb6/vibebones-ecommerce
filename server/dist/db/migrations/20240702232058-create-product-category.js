// migrations/20240702142500-create-product-category.ts
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
            yield queryInterface.createTable('product_category', {
                product_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    references: {
                        model: 'products',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                category_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    references: {
                        model: 'categories',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('product_category');
        });
    }
};
//# sourceMappingURL=20240702232058-create-product-category.js.map