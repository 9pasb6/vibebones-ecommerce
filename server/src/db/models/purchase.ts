import { Optional } from "sequelize";
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

// Interfaces
interface PurchaseAttributes {
  id: number;
  user_id: number;
  cart_id: number;
  quantity: number;
  price_quantity: number;
  total_quantity: number;
  total: number;
  date: string;
}

interface PurchaseCreationAttributes extends Optional<PurchaseAttributes, 'id'> {}

class Purchase extends Model<PurchaseAttributes, PurchaseCreationAttributes> implements PurchaseAttributes {
  public id!: number;
  public user_id!: number;
  public cart_id!: number;
  public quantity!: number;
  public price_quantity!: number;
  public total_quantity!: number;
  public total!: number;
  public date!: string;
}

Purchase.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    paranoid: false,
    timestamps: false,
    modelName: 'purchases', // Ajusta el nombre del modelo según tu preferencia
    freezeTableName: true,
  }
);

export default Purchase ;
export type { PurchaseAttributes, PurchaseCreationAttributes };