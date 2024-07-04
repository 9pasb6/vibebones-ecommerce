// models/AdExpression.ts

const { DataTypes, Model }  = require ('sequelize');
const  sequelize = require('../../config/database');



// Interfaces
interface InventoryProductAttributes {
    product_id: number;
    inventory_id: number;
    
  }

  interface InventoryProductCreationAttributes extends InventoryProductAttributes {}

  
class InventoryProduct extends Model<InventoryProductAttributes, InventoryProductCreationAttributes> implements InventoryProductAttributes {
    product_id!: number;
    inventory_id!: number;
    quantity!: number;
    price_quantity!: number;
  }

  InventoryProduct.init(
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
          model: 'inventories',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      paranoid: false,
      timestamps: false,
      modelName: 'inventory_products', // Adjust the model name as per your preference
      freezeTableName: true,
    }
  );

  export default InventoryProduct;
  export type { InventoryProductAttributes, InventoryProductCreationAttributes };
