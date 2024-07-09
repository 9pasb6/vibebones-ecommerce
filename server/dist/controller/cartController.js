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
}));
/**
 * Retrieves a cart by ID.
 */
const getCartById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const cart = yield db.carts.findByPk(id, {
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
}));
/**
 * Creates a new cart.
 */
const createCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, cartProducts } = req.body; // Assuming cartProducts is an array of product details
    // Create the cart
    const newCart = yield db.carts.create({ user_id: userId });
    // Add products to the cart
    const cartProductsData = cartProducts.map((product) => ({
        cart_id: newCart.id,
        product_id: product.productId,
        quantity: product.quantity,
    }));
    yield db.cart_products.bulkCreate(cartProductsData);
    return res.status(201).json({
        status: "success",
        data: newCart,
    });
}));
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
    const cart = yield db.carts.findByPk(id);
    if (!cart) {
        return res.status(404).json({
            status: "fail",
            message: "Cart not found",
        });
    }
    yield cart.destroy();
    return res.status(204).json({
        status: "success",
        data: null,
    });
}));
module.exports = { getAllCarts, getCartById, createCart, updateCart, deleteCart };
//# sourceMappingURL=cartController.js.map