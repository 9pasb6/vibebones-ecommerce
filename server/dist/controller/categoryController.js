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
// Utilities
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
// Error Handling
const appError_1 = __importDefault(require("../utils/appError"));
// External Libraries
const sequelize = require("../config/database");
// ----------------------------------------------
const getCategoryById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield db.categories.findByPk(id);
    if (!category) {
        throw new appError_1.default("Categoría no encontrada", 404);
    }
    res.status(200).json({
        status: "success",
        message: "Categoría recuperada exitosamente",
        data: category,
    });
}));
// ----------------------------------------------
/**
 * Retrieves all categories.
 */
const getAllCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield db.categories.findAll();
    res.status(200).json({
        status: "success",
        message: "Categorias recuperadas exitosamente",
        categories,
    });
}));
/**
 * Creates a new category.
 */
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        throw new appError_1.default("El nombre de la categoría es requerido", 400);
    }
    const categoryExists = yield db.categories.findOne({
        where: { name },
    });
    if (categoryExists) {
        throw new appError_1.default("Ya existe una categoría con este nombre", 400);
    }
    const category = yield db.categories.create({ name });
    if (!category) {
        throw new appError_1.default("No se pudo crear la categoría", 400);
    }
    res.status(201).json({
        status: "success",
        message: "Categoría creada exitosamente",
        category,
    });
}));
/**
 * Updates a category.
 */
const updateCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        throw new appError_1.default("El nombre de la categoría es requerido", 400);
    }
    const category = yield db.categories.findByPk(id);
    if (!category) {
        throw new appError_1.default("Categoría no encontrada", 404);
    }
    const updatedCategory = yield category.update({ name });
    if (!updatedCategory) {
        throw new appError_1.default("No se pudo actualizar la categoría", 400);
    }
    res.status(200).json({
        status: "success",
        message: "Categoría actualizada exitosamente",
        category: updatedCategory,
    });
}));
/**
 * Deletes a category.
 */
const deleteCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield db.categories.findByPk(id);
    if (!category) {
        throw new appError_1.default("Categoría no encontrada", 404);
    }
    // Validate if the category is being used by any ad
    const ad = yield db.ads.findOne({
        where: { category_id: id },
    });
    if (ad) {
        throw new appError_1.default("No se puede eliminar la categoría porque está en uso", 400);
    }
    yield category.destroy();
    // 204: No Content
    res.status(204).json();
}));
// ----------------------------------------------
module.exports = {
    getCategoryById,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
//# sourceMappingURL=categoryController.js.map