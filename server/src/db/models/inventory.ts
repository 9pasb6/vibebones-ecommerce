import { Optional } from "sequelize";
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

// Interfaces
interface InventoryAttributes {
  id: number;
  date: string;
  user_id: number;
}

interface InventoryCreationAttributes extends Optional<InventoryAttributes, 'id'> {}

class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> implements InventoryAttributes {
  public id!: number;
  public date!: string;
  public user_id!: number;
}

Inventory.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize,
    paranoid: false,
    timestamps: false,
    modelName: 'inventories', 
    freezeTableName: true,
  }
);

export default Inventory ;
export type { InventoryAttributes, InventoryCreationAttributes };