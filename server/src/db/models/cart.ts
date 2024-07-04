// models/Cart.ts
import { Optional } from "sequelize";
const { DataTypes, Model }  = require ('sequelize');
const  sequelize  = require('../../config/database');



// These are all the attributes in the Ad model
interface CartAttributes {
    id: number;
    user_id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
  }


  // These are the attributes that are allowed to be set when creating a new Ad instance
interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {}

class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
    public id!: number;
    public user_id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
    public deletedAt?: Date | null;

}

Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'carts', // Adjust the model name as per your preference
      timestamps: true,
    }
  );

export default  Cart;
export type { CartAttributes, CartCreationAttributes };