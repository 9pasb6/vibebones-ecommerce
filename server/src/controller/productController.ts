import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import db from '../db/models/index';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

// ----------------------------------------------
/**
 * Recupera un producto por su ID.
 */
const getProductById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.id;

  const product = await db.products.findByPk(productId, {
    include: [
      {
        model: db.categories
      },
      // {
      //   model: db.inventories,
      //   attributes: ['quantity', 'location'],
      // },
    ],
  });

  if (!product) {
    throw new AppError('Producto no encontrado', 404);
  }

  res.status(200).json({
    message: 'Producto recuperado con éxito',
    product,
  });
});

// ----------------------------------------------
/**
 * Crea un nuevo producto.
 */
const createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { title, description, price, stock, tax, category_id } = req.body;

  if (!title || !price || !category_id ) {
    throw new AppError('El título, precio, ID de categoría, fecha y estado son obligatorios', 400);
  }

  try {
    const product = await db.products.create({
      title,
      description,
      price,
      stock,
      tax,
      category_id
     
    });
  
    if (!product) {
      throw new AppError('Error al crear el producto', 400);
    }
  
    res.status(201).json({
      message: 'Producto creado con éxito',
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al crear el producto",
    });
  }
});

// ----------------------------------------------
/**
 * Actualiza un producto existente.
 */
const updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.id;

  const product = await db.products.findByPk(productId);

  if (!product) {
    throw new AppError('Producto no encontrado', 404);
  }

  const { title, description, price, stock, tax, category_id, date, status } = req.body;

  const updatedProduct = await product.update({
    title,
    description,
    price,
    stock,
    tax,
    category_id,
    date,
    status,
  });

  if (!updatedProduct) {
    throw new AppError('Error al actualizar el producto', 400);
  }

  res.status(200).json({
    message: 'Producto actualizado con éxito',
    product: updatedProduct,
  });
});

// ----------------------------------------------
/**
 * Elimina un producto existente.
 */
const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const product = await db.products.findByPk(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.destroy();

    return res.status(200).json({
      status: "success",
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al eliminar el producto",
    });
  }
});

// ----------------------------------------------
/**
 * Recupera todos los productos.
 */
const getAllProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const products = await db.products.findAll();

  if (!products.length) {
    return res.status(200).json({
      status: 'success',
      message: 'No se encontraron productos',
      products: [],
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Productos recuperados con éxito',
    products,
  });
});




// ----------------------------------------------
/**
 * Recupera todos los productos de un inventario.
 */
const getProductsByInventory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const inventoryId = req.params.id;

  const products = await db.products.findAll({
    include: [
      {
        model: db.Inventory,
        where: { id: inventoryId },
      },
    ],
  });

  if (!products.length) {
    return res.status(200).json({
      message: 'No se encontraron productos en el inventario',
      products: [],
    });
  }

  res.status(200).json({
    message: 'Productos recuperados con éxito',
    products,
  });
});

// ----------------------------------------------
/**
 * Recupera todos los productos asociados a un usuario.
 */
const getProductsByUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;

  const products = await db.products.findAll({
    where: { userId },
  });

  if (!products.length) {
    return res.status(200).json({
      message: 'No se encontraron productos para el usuario',
      products: [],
    });
  }

  res.status(200).json({
    message: 'Productos recuperados con éxito',
    products,
  });
});

export {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductsByInventory,
  getProductsByUser,
};
