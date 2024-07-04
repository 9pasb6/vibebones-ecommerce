"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = process.env.ADMIN_PASSWORD;
            const hashPassword = bcrypt_1.default.hashSync(password, 10);
            return queryInterface.bulkInsert("users", [
                {
                    userType: "ADMIN",
                    email: process.env.ADMIN_EMAIL,
                    commerceName: "Admin",
                    password: hashPassword,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            // Delete all admin users
            return queryInterface.bulkDelete("users", { userType: "ADMIN" }, {});
        });
    },
};
//# sourceMappingURL=20240416043140-admin-user.js.map