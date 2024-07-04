import { NextFunction, Request, Response } from 'express';

// Models
const db = require("../db/models/index");

// Utilities
const catchAsync = require("../utils/catchAsync");

// Error Handling
const AppError = require("../utils/appError");

// External Libraries
const sequelize = require("../config/database");

// ----------------------------------------------

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await db.categories.findByPk(id);

  if (!category) {
    throw new AppError("Categoría no encontrada", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Categoría recuperada exitosamente",
    data: category,
  });
});

// ----------------------------------------------

/**
 * Retrieves all categories.
 */
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await db.categories.findAll();

  res.status(200).json({
    status: "success",
    message: "Categorias recuperadas exitosamente",
    categories,
  });
});

/**
 * Creates a new category.
 */
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    throw new AppError("El nombre de la categoría es requerido", 400);
  }

  const categoryExists = await db.categories.findOne({
    where: { name },
  });

  if (categoryExists) {
    throw new AppError("Ya existe una categoría con este nombre", 400);
  }

  const category = await db.categories.create({ name });

  if (!category) {
    throw new AppError("No se pudo crear la categoría", 400);
  }

  res.status(201).json({
    status: "success",
    message: "Categoría creada exitosamente",
    category,
  });
});

/**
 * Updates a category.
 */
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    throw new AppError("El nombre de la categoría es requerido", 400);
  }

  const category = await db.categories.findByPk(id);

  if (!category) {
    throw new AppError("Categoría no encontrada", 404);
  }

  const updatedCategory = await category.update({ name });

  if (!updatedCategory) {
    throw new AppError("No se pudo actualizar la categoría", 400);
  }

  res.status(200).json({
    status: "success",
    message: "Categoría actualizada exitosamente",
    category: updatedCategory,
  });
});

/**
 * Deletes a category.
 */
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await db.categories.findByPk(id);

  if (!category) {
    throw new AppError("Categoría no encontrada", 404);
  }

  // Validate if the category is being used by any ad
  const ad = await db.ads.findOne({
    where: { category_id: id },
  });

  if (ad) {
    throw new AppError(
      "No se puede eliminar la categoría porque está en uso",
      400
    );
  }

  await category.destroy();

  // 204: No Content
  res.status(204).json();
});

// ----------------------------------------------

module.exports = {
  getCategoryById,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
