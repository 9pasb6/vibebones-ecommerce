// Models
const db = require("../db/models/index");
import { Request, Response, NextFunction } from 'express';

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
        attributes: ["cart_id", "product_id", "quantity"],
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
const getCartById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  
  try {
    const cart = await db.carts.findByPk(id, {
      attributes: { exclude: ["deletedAt"] },
      include: [
        {
          model: db.users,
          attributes: ["id", "email"],
        },
        {
          model: db.cart_products,
          attributes: ["cart_id", "product_id", "quantity", "price_quantity"], // Incluimos los atributos de cart_products
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
  } catch (error) {
    console.error(error);
    return next(new AppError('Error al obtener el carrito', 500));
  }
});


/**
 * Creates a new cart.
 */
const createCart = catchAsync(async (req: Request, res: Response) => {
  // Asumiendo que tienes acceso al ID del usuario logueado a través de req.user.id o req.user.userId
  const {user_id} = req.body

  // Crear un carrito vacío para el usuario logueado
  const newCart = await db.carts.create({ user_id: user_id});

  return res.status(201).json({
    status: "success",
    message: "Carrito creado exitosamente",
    data: newCart,
  });
});

// const createCart = catchAsync(async (req: Request, res: Response) => {
//   const { userId, cartProducts } = req.body; // Assuming cartProducts is an array of product details

//   // Create the cart
//   const newCart = await db.carts.create({ user_id: userId });

//   // Add products to the cart
//   const cartProductsData = cartProducts.map((product: any) => ({
//     cart_id: newCart.id,
//     product_id: product.productId,
//     quantity: product.quantity,
//   }));

//   await db.cart_products.bulkCreate(cartProductsData);

//   return res.status(201).json({
//     status: "success",
//     data: newCart,
//   });
// });

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

  try {
    // Buscar el carrito por su ID
    const cart = await db.carts.findByPk(id);

    if (!cart) {
      return res.status(404).json({
        status: "fail",
        message: "Cart not found",
      });
    }

    // Eliminar todos los productos asociados al carrito de la tabla intermedia cart_products
    await db.cart_products.destroy({
      where: { cart_id: cart.id },
    });

    // Ahora eliminar el carrito
    await cart.destroy();

    return res.status(200).json({
      status: "success",
      message: "Carrito eliminado exitosamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Error al eliminar el carrito",
    });
  }
});



const addProductToCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { userId, cartId, productId, quantity } = req.body;

  try {
    // Verificar si el producto existe
    const product = await db.products.findByPk(productId);
    if (!product) {
      return next(new AppError('Producto no encontrado', 404));
    }

    // Verificar si el carrito pertenece al usuario y está activo
    const cart = await db.carts.findOne({
      where: { id: cartId, user_id: userId, status: true },
      include: [{
        model: db.cart_products,
        include: [{
          model: db.products,
          attributes: ['id', 'title', 'price'],
        }],
      }, {
        model: db.users,
        attributes: ['id', 'email'],
      }],
    });

    if (!cart) {
      return next(new AppError('Carrito no encontrado o no activo para este usuario', 404));
    }

    // Verificar si el producto ya está en el carrito
    const existingCartProduct = await db.cart_products.findOne({
      where: { cart_id: cart.id, product_id: productId },
    });

    let cartProduct;
    if (existingCartProduct) {
      // Actualizar la cantidad y el precio si el producto ya está en el carrito
      cartProduct = await existingCartProduct.update({
        quantity: existingCartProduct.quantity + quantity,
        price_quantity: existingCartProduct.price_quantity + (product.price * quantity),
      });
    } else {
      // Agregar el producto al carrito si no está presente
      cartProduct = await db.cart_products.create({
        cart_id: cart.id,
        product_id: productId,
        quantity,
        price_quantity: product.price * quantity,
      });
    }

    // Recalcular el total del carrito
    const cartProducts = await db.cart_products.findAll({
      where: { cart_id: cart.id },
      include: [{
        model: db.products,
        attributes: ['id', 'title', 'price'],
      }],
    });

    const total = cartProducts.reduce((sum: number, item: any) => sum + item.price_quantity, 0);

    // Actualizar el carrito con el nuevo total
    await cart.update({ total });

    // Construir la respuesta en el formato requerido
    const responseData = {
      status: 'success',
      data: {
        id: cart.id,
        user_id: cart.user_id,
        status: cart.status,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
        user: {
          id: cart.user.id,
          email: cart.user.email,
        },
        cart_products: cartProducts.map((cp:any) => ({
          cart_id: cp.cart_id,
          product_id: cp.product.id,
          quantity: cp.quantity,
          price_quantity: cp.price_quantity,
          product: {
            id: cp.product.id,
            title: cp.product.title,
            price: cp.product.price,
          },
        })),
      },
    };

    return res.status(201).json(responseData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error al agregar el producto al carrito',
    });
  }
});





/**
 * Elimina un producto del carrito.
 */

const deleteProductFromCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { cartId, productId } = req.body; // Utilizamos req.params para obtener cartId
  // const { productId } = req.body; // Utilizamos req.body para obtener productId

  console.log("desde delete cart product")
  console.log(cartId)
  console.log(productId)


  try {
    // Verificar si el carrito existe y pertenece al usuario
    const cart = await db.carts.findOne({
      where: { id: cartId },
    });



    if (!cart) {
      throw new AppError('Carrito no encontrado', 404);
    }

    // Verificar si el producto está en el carrito
    const cartProduct = await db.cart_products.findOne({
      where: { cart_id: cartId, product_id: productId },
    });

    if (!cartProduct) {
      throw new AppError('Producto no encontrado en el carrito', 404);
    }

    // Eliminar el producto del carrito
    await cartProduct.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'Producto eliminado del carrito exitosamente',
    });
  } catch (error) {
    console.error(error);
    return next(new AppError('Error al eliminar el producto del carrito', 500));
  }
});





module.exports = { getAllCarts, getCartById, createCart, updateCart, deleteCart, addProductToCart, deleteProductFromCart };
