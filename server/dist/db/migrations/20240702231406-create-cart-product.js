// migrations/20240702141000-create-cart-products.ts
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
            yield queryInterface.createTable('cart_products', {
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
                cart_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    references: {
                        model: 'carts',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                quantity: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                },
                price_quantity: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                },
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.dropTable('cart_products');
        });
    }
};
//# sourceMappingURL=20240702231406-create-cart-product.js.map