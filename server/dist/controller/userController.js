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
Object.defineProperty(exports, "__esModule", { value: true });
// Models
const db = require("../db/models/index");
// External Libraries
const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");
// Utilities
const catchAsync = require("../utils/catchAsync");
// Error Handling
const AppError = require("../utils/appError");
// ----------------------------------------------
/**
 * Retrieves all users.
 */
const getAllUser = catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db.users.findAndCountAll({
        where: {
            userType: {
                [Sequelize.Op.ne]: "ADMIN",
            },
        },
        attributes: { exclude: ["password", "deletedAt"] },
    });
    return res.status(200).json({
        status: "success",
        data: users,
    });
}));
// ----------------------------------------------
/**
 * Assigns malls to a user.
 */
const assignMallsToUser = catchAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { malls } = req.body; // array of mall ids
    // Iniciar transacción
    yield sequelize.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
        // Verificar la existencia del usuario
        const foundUser = yield db.users.findByPk(userId, { transaction: t });
        if (!foundUser) {
            throw new AppError("User not found", 404);
        }
        // Verificar que todos los malls existan utilizando una consulta de conteo
        const foundMallsCount = yield db.malls.count({
            where: {
                id: malls,
            },
            transaction: t,
        });
        if (foundMallsCount !== malls.length) {
            throw new AppError("One or more malls not found", 404);
        }
        // Eliminar asignaciones de malls existentes
        yield db.mall_user.destroy({
            where: {
                user_id: userId,
            },
            transaction: t,
        });
        // Crear nuevas asociaciones
        const newAssociations = malls.map((mallId) => ({
            user_id: userId,
            mall_id: mallId,
        }));
        // Asignar nuevos malls al usuario
        yield db.mall_user.bulkCreate(newAssociations, { transaction: t });
    }));
    // Responder con éxito
    return res.status(200).json({
        status: "success",
        message: "Malls assigned to user successfully",
    });
}));
module.exports = { getAllUser, assignMallsToUser };
//# sourceMappingURL=userController.js.map