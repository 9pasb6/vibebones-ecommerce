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
const db = require("../db/models/index");
const generatePurchase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId } = req.body; // Suponiendo que recibes el ID del carrito desde el cuerpo de la solicitud
    try {
        // Buscar el carrito junto con sus productos asociados a través de cart_products
        const cart = yield db.carts.findByPk(cartId, {
            include: [
                {
                    model: db.cart_products, // Incluir la tabla intermedia cart_products
                    include: {
                        model: db.products, // Incluir los productos a través de cart_products
                    }
                },
                {
                    model: db.users, // Incluir el modelo de usuarios para obtener el commerceName y el email
                    attributes: ['commerceName', 'email'] // Especificar los atributos que deseas incluir
                }
            ]
        });
        if (!cart) {
            return next(new Error('Carrito no encontrado'));
        }
        // Calcular el total de la compra
        let total = 0;
        cart.cart_products.forEach((cartProduct) => {
            total += cartProduct.price_quantity;
        });
        // Iniciar transacción
        const transaction = yield db.sequelize.transaction();
        try {
            // Crear la compra
            const purchase = yield db.purchases.create({
                id: generateDynamicId(), // Genera tu ID dinámico aquí
                user_id: cart.user_id,
                cart_id: cart.id, // Asignar el cart_id del carrito
                total,
            }, { transaction });
            // Actualizar el stock de los productos
            yield Promise.all(cart.cart_products.map((cartProduct) => __awaiter(void 0, void 0, void 0, function* () {
                const product = cartProduct.product;
                yield product.update({
                    stock: product.stock - cartProduct.quantity,
                }, { transaction });
            })));
            // Confirmar la transacción
            yield transaction.commit();
            // Retornar respuesta exitosa
            return res.status(201).json({
                status: 'success',
                message: 'Compra generada exitosamente',
                purchaseId: purchase.id,
                cart,
                total,
            });
        }
        catch (error) {
            // Revertir la transacción en caso de error
            yield transaction.rollback();
            throw error;
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Error al generar la compra',
        });
    }
});
// Función para generar un ID dinámico simple (ejemplo)
function generateDynamicId() {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}
// Obtener todas las compras
const getAllPurchases = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchases = yield db.purchases.findAll({
            include: [
                {
                    model: db.users, // Incluir información del usuario
                    attributes: ['commerceName', 'email']
                },
                {
                    model: db.carts, // Incluir información del carrito
                    include: [
                        {
                            model: db.cart_products, // Incluir información de los productos en el carrito
                            include: {
                                model: db.products,
                            }
                        }
                    ]
                }
            ]
        });
        return res.status(200).json({
            status: 'success',
            results: purchases.length,
            purchases,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Error al obtener las compras',
        });
    }
});
// Obtener compras por ID de usuario
const getPurchasesByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const purchases = yield db.purchases.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: db.users, // Incluir información del usuario
                    attributes: ['commerceName', 'email']
                },
                {
                    model: db.carts, // Incluir información del carrito
                    include: [
                        {
                            model: db.cart_products, // Incluir información de los productos en el carrito
                            include: {
                                model: db.products,
                            }
                        }
                    ]
                }
            ]
        });
        return res.status(200).json({
            status: 'success',
            results: purchases.length,
            purchases,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Error al obtener las compras del usuario',
        });
    }
});
module.exports = { generatePurchase, getAllPurchases, getPurchasesByUserId };
//# sourceMappingURL=purchaseController.js.map