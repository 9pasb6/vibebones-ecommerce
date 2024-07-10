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
            include: {
                model: db.products,
                through: { model: db.cart_products },
            },
        });
        if (!cart) {
            return next(new Error('Carrito no encontrado'));
        }
        // Calcular el total de la compra
        let total = 0;
        cart.products.forEach((product) => {
            const cartProduct = product.cart_products;
            total += cartProduct.quantity * cartProduct.price_quantity;
        });
        // Iniciar transacción
        const transaction = yield db.sequelize.transaction();
        try {
            // Crear la compra
            const purchase = yield db.purchases.create({
                id: generateDynamicId(), // Genera tu ID dinámico aquí
                user_id: cart.user_id,
                cart_id: cart.id,
                total,
            }, { transaction });
            // Actualizar el stock de los productos
            yield Promise.all(cart.products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
                const cartProduct = product.cart_products;
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
module.exports = { generatePurchase };
//# sourceMappingURL=purchaseController.js.map