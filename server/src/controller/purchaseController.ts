import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
const db = require("../db/models/index");



const generatePurchase = async (req: Request, res: Response, next: NextFunction) => {
    const { cartId } = req.body; // Suponiendo que recibes el ID del carrito desde el cuerpo de la solicitud
  
    try {
      // Buscar el carrito junto con sus productos asociados a través de cart_products
      const cart = await db.carts.findByPk(cartId, {
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
      cart.cart_products.forEach((cartProduct: any) => {
        // total += cartProduct.quantity * cartProduct.price_quantity;
        total += cartProduct.price_quantity;
      });
  
      // Iniciar transacción
      const transaction = await db.sequelize.transaction();
  
      try {
        // Crear la compra
        const purchase = await db.purchases.create({
          id: generateDynamicId(), // Genera tu ID dinámico aquí
          user_id: cart.user_id,
          cart_id: cart.id, // Asignar el cart_id del carrito
          total,
        }, { transaction });
  
        // Actualizar el stock de los productos
        await Promise.all(cart.cart_products.map(async (cartProduct: any) => {
          const product = cartProduct.product;
          await product.update({
            stock: product.stock - cartProduct.quantity,
          }, { transaction });
        }));
  
        // Confirmar la transacción
        await transaction.commit();
  
        // Retornar respuesta exitosa
        return res.status(201).json({
          status: 'success',
          message: 'Compra generada exitosamente',
          purchaseId: purchase.id,
          cart,
          total,
        });
      } catch (error) {
        // Revertir la transacción en caso de error
        await transaction.rollback();
        throw error;
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 'error',
        message: 'Error al generar la compra',
      });
    }
  };
  
  
  
  

// Función para generar un ID dinámico simple (ejemplo)
function generateDynamicId() {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}
  
  

module.exports = {generatePurchase};
