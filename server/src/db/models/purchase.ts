import { Optional } from "sequelize";
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

// Interfaces
interface PurchaseAttributes {
  id: string;
  user_id: number;
  cart_id: number;
  date: Date;
  total: number
}

interface PurchaseCreationAttributes extends Optional<PurchaseAttributes, 'id'> {}

class Purchase extends Model<PurchaseAttributes, PurchaseCreationAttributes> implements PurchaseAttributes {
  public id!: string;
  public user_id!: number;
  public cart_id!: number;
  public date!: Date;
  public total!: number;
}

Purchase.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'carts',
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
     },
  },
  {
    sequelize,
    paranoid: false,
    timestamps: false,
    modelName: 'purchases', 
    freezeTableName: true,
  }
);

export default Purchase;
export type { PurchaseAttributes, PurchaseCreationAttributes };
