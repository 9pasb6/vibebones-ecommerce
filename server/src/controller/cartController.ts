// Models
const db = require("../db/models/index");
import { Request, Response } from 'express';

// External Libraries
const { Sequelize } = require("sequelize");

// Utilities
import catchAsync from '../utils/catchAsync';

// Error Handling
import AppError from "../utils/appError";

// ----------------------------------------------

/**
 * Retrieves all carts.
 */
const getAllCarts = catchAsync(async (req: Request, res: Response) => {
  const carts = await db.carts.findAndCountAll({
    attributes: { exclude: ["deletedAt"] },
    include: [
      {
        model: db.users,
        attributes: ["id", "email"],
      },
      {
        model: db.cart_products,
        attributes: ["id", "product_id", "quantity"],
        include: [
          {
            model: db.products,
            attributes: ["id", "title", "price"],
          },
        ],
      },
    ],
  });
  return res.status(200).json({
    status: "success",
    data: carts,
  });
});

/**
 * Retrieves a cart by ID.
 */
const getCartById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const cart = await db.carts.findByPk(id, {
    attributes: { exclude: ["deletedAt"] },
    include: [
      {
        model: db.users,
        attributes: ["id", "email"],
      },
      {
        model: db.cart_products,
        attributes: ["id", "product_id", "quantity"],
        include: [
          {
            model: db.products,
            attributes: ["id", "title", "price"],
          },
        ],
      },
    ],
  });

  if (!cart) {
    return res.status(404).json({
      status: "fail",
      message: "Cart not found",
    });
  }

  return res.status(200).json({
    status: "success",
    data: cart,
  });
});

/**
 * Creates a new cart.
 */
const createCart = catchAsync(async (req: Request, res: Response) => {
  const { userId, cartProducts } = req.body; // Assuming cartProducts is an array of product details

  // Create the cart
  const newCart = await db.carts.create({ user_id: userId });

  // Add products to the cart
  const cartProductsData = cartProducts.map((product: any) => ({
    cart_id: newCart.id,
    product_id: product.productId,
    quantity: product.quantity,
  }));

  await db.cart_products.bulkCreate(cartProductsData);

  return res.status(201).json({
    status: "success",
    data: newCart,
  });
});

/**
 * Updates a cart by ID.
 */
const updateCart = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, cartProducts } = req.body;

  const cart = await db.carts.findByPk(id);

  if (!cart) {
    return res.status(404).json({
      status: "fail",
      message: "Cart not found",
    });
  }

  // Update cart details
  cart.user_id = userId || cart.user_id;
  await cart.save();

  // Remove existing cart products
  await db.cart_products.destroy({ where: { cart_id: id } });

  // Add new cart products
  const cartProductsData = cartProducts.map((product: any) => ({
    cart_id: id,
    product_id: product.productId,
    quantity: product.quantity,
  }));

  await db.cart_products.bulkCreate(cartProductsData);

  return res.status(200).json({
    status: "success",
    data: cart,
  });
});

/**
 * Deletes a cart by ID.
 */
const deleteCart = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const cart = await db.carts.findByPk(id);

  if (!cart) {
    return res.status(404).json({
      status: "fail",
      message: "Cart not found",
    });
  }

  await cart.destroy();

  return res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = { getAllCarts, getCartById, createCart, updateCart, deleteCart };
