import { Optional } from "sequelize";
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

// Interfaces
interface ProductAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  tax: number;
  category_id: number;
  date: string;
  status: boolean;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public stock!: number;
  public tax!: number;
  public category_id!: number;
  public date!: string;
  public status!: boolean;
}

Product.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tax: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    paranoid: false,
    timestamps: false,
    modelName: 'products', 
    freezeTableName: true,
  }
);

export default  Product ;
export type { ProductAttributes, ProductCreationAttributes };