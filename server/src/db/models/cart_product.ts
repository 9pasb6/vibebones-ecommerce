// models/AdExpression.ts

const { DataTypes, Model }  = require ('sequelize');
const  sequelize = require('../../config/database');



// Interfaces
interface CartProductAttributes {
    product_id: number;
    cart_id: number;
    quantity: number;
    price_quantity: number;
    
  }
  
  interface CartProductCreationAttributes extends CartProductAttributes {}
  
  
  class CartProduct extends Model<CartProductAttributes, CartProductCreationAttributes> implements CartProductAttributes {
    product_id!: number;
    cart_id!: number;
    quantity!: number;
    price_quantity!: number;
    
  }

  CartProduct.init(
    {
        product_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
      },
        cart_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'carts',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
       },
       price_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
       },
    },
    {
      sequelize,
      paranoid: false,
      timestamps: false,
      modelName: 'cart_products', // Adjust the model name as per your preference
      freezeTableName: true,
    }
  );

  export default CartProduct;
  export type { CartProductAttributes, CartProductCreationAttributes };
