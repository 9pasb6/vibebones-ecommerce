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
// Models
const db = require("../db/models/index");
// External Libraries
const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");
// Utilities
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
// Error Handling
const appError_1 = __importDefault(require("../utils/appError"));
// ----------------------------------------------
// Retrieve all users
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
// Retrieve a user by ID
const getUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield db.users.findByPk(id, {
        attributes: { exclude: ["password", "deletedAt"] },
    });
    if (!user) {
        throw new appError_1.default("User not found", 404);
    }
    return res.status(200).json({
        status: "success",
        data: user,
    });
}));
// Update a user by ID
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userType, email, commerceName, password, confirmPassword } = req.body;
    if (password && password !== confirmPassword) {
        throw new appError_1.default("Passwords do not match", 400);
    }
    const user = yield db.users.findByPk(id);
    if (!user) {
        throw new appError_1.default("User not found", 404);
    }
    const updatedUser = yield user.update({
        userType,
        email,
        commerceName,
        password: password ? password : user.password,
    });
    return res.status(200).json({
        status: "success",
        data: updatedUser,
    });
}));
// Delete a user by ID
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield db.users.findByPk(id);
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    try {
        yield user.destroy({ where: { id: id } });
        return res.status(204).json({
            status: "success",
            message: "usuario eliminado con exito",
        });
    }
    catch (error) {
        console.log(error);
    }
});
module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    // assignMallsToUser, // existing function
};
//# sourceMappingURL=userController.js.map