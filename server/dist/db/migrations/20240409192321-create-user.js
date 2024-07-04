// migrations/20240629175500-create-users.ts
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
/** @type {import('sequelize-cli').Migration} */
const sequelize_1 = require("sequelize");
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.createTable('users', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: sequelize_1.DataTypes.INTEGER,
                },
                userType: {
                    type: sequelize_1.DataTypes.ENUM('ADMIN', 'USER', 'LOCATION'),
                },
                email: {
                    type: sequelize_1.DataTypes.STRING,
                    unique: true,
                },
                commerceName: {
                    type: sequelize_1.DataTypes.STRING,
                    unique: true,
                },
                password: {
                    type: sequelize_1.DataTypes.STRING,
                },
                status: {
                    type: sequelize_1.DataTypes.BOOLEAN,
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
            yield queryInterface.dropTable('users');
        });
    }
};
//# sourceMappingURL=20240409192321-create-user.js.map