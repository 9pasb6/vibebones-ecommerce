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
// Utilities
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
// Error Handling
const appError_1 = __importDefault(require("../utils/appError"));
// ----------------------------------------------
/**
 * Retrieves all carts.
 */
const getAllCarts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield db.carts.findAndCountAll({
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
}));
/**
 * Retrieves a cart by ID.
 */
const getCartById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cart = yield db.carts.findByPk(id, {
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
    }
    catch (error) {
        console.error(error);
        return next(new appError_1.default('Error al obtener el carrito', 500));
    }
}));
/**
 * Creates a new cart.
 */
const createCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Asumiendo que tienes acceso al ID del usuario logueado a través de req.user.id o req.user.userId
    const { user_id } = req.body;
    // Crear un carrito vacío para el usuario logueado
    const newCart = yield db.carts.create({ user_id: user_id });
    return res.status(201).json({
        status: "success",
        message: "Carrito creado exitosamente",
        data: newCart,
    });
}));
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
const updateCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId, cartProducts } = req.body;
    const cart = yield db.carts.findByPk(id);
    if (!cart) {
        return res.status(404).json({
            status: "fail",
            message: "Cart not found",
        });
    }
    // Update cart details
    cart.user_id = userId || cart.user_id;
    yield cart.save();
    // Remove existing cart products
    yield db.cart_products.destroy({ where: { cart_id: id } });
    // Add new cart products
    const cartProductsData = cartProducts.map((product) => ({
        cart_id: id,
        product_id: product.productId,
        quantity: product.quantity,
    }));
    yield db.cart_products.bulkCreate(cartProductsData);
    return res.status(200).json({
        status: "success",
        data: cart,
    });
}));
/**
 * Deletes a cart by ID.
 */
const deleteCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Buscar el carrito por su ID
        const cart = yield db.carts.findByPk(id);
        if (!cart) {
            return res.status(404).json({
                status: "fail",
                message: "Cart not found",
            });
        }
        // Eliminar todos los productos asociados al carrito de la tabla intermedia cart_products
        yield db.cart_products.destroy({
            where: { cart_id: cart.id },
        });
        // Ahora eliminar el carrito
        yield cart.destroy();
        return res.status(200).json({
            status: "success",
            message: "Carrito eliminado exitosamente",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Error al eliminar el carrito",
        });
    }
}));
const addProductToCart = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity } = req.body;
    try {
        // Verificar si el producto existe
        const product = yield db.products.findByPk(productId);
        if (!product) {
            return next(new appError_1.default('Producto no encontrado', 404));
        }
        // Buscar el carrito del usuario
        const cart = yield db.carts.findOne({
            where: { user_id: userId },
        });
        if (!cart) {
            return next(new appError_1.default('Carrito no encontrado', 404));
        }
        // Verificar si el producto ya está en el carrito
        const existingCartProduct = yield db.cart_products.findOne({
            where: { cart_id: cart.id, product_id: productId },
        });
        let cartProduct;
        if (existingCartProduct) {
            // Actualizar la cantidad y el precio si el producto ya está en el carrito
            cartProduct = yield existingCartProduct.update({
                quantity: existingCartProduct.quantity + quantity,
                price_quantity: existingCartProduct.price_quantity + (product.price * quantity),
            });
        }
        else {
            // Agregar el producto al carrito si no está presente
            cartProduct = yield db.cart_products.create({
                cart_id: cart.id,
                product_id: productId,
                quantity,
                price_quantity: product.price * quantity,
            });
        }
        // Recalcular el total del carrito
        const cartProducts = yield db.cart_products.findAll({
            where: { cart_id: cart.id },
        });
        const total = cartProducts.reduce((sum, item) => sum + item.price_quantity, 0);
        // Actualizar el carrito con el nuevo total
        yield cart.update({ total });
        return res.status(201).json({
            status: "success",
            message: "Producto agregado al carrito exitosamente",
            cartProduct,
            total,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Error al agregar el producto al carrito",
        });
    }
}));
/**
 * Elimina un producto del carrito.
 */
const deleteProductFromCart = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.params; // Utilizamos req.params para obtener userId y productId
    try {
        // Buscar el carrito del usuario
        const cart = yield db.carts.findOne({
            where: { user_id: userId },
        });
        if (!cart) {
            throw new appError_1.default('Carrito no encontrado', 404);
        }
        // Verificar si el producto está en el carrito
        const cartProduct = yield db.cart_products.findOne({
            where: { cart_id: cart.id, product_id: productId },
        });
        if (!cartProduct) {
            throw new appError_1.default('Producto no encontrado en el carrito', 404);
        }
        // Eliminar el producto del carrito
        yield cartProduct.destroy();
        return res.status(200).json({
            status: 'success',
            message: 'Producto eliminado del carrito exitosamente',
        });
    }
    catch (error) {
        console.error(error);
        return next(new appError_1.default('Error al eliminar el producto del carrito', 500));
    }
}));
exports.default = deleteProductFromCart;
module.exports = { getAllCarts, getCartById, createCart, updateCart, deleteCart, addProductToCart, deleteProductFromCart };
//# sourceMappingURL=cartController.js.map