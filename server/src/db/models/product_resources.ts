// models/AdResource.ts

import { Optional } from "sequelize";
const { DataTypes, Model }  = require ('sequelize');
const  sequelize  = require('../../config/database');

// Interfaces
interface ProductResourceAttributes {
  id: number;
  product_id: number;
  file_name: string;
  url: string;
  width: number;
  height: number;
  size: number;
  resource_type: string;
  public_id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

// These are the attributes that are allowed to be set when creating a new AdResource instance
interface ProductResourceCreationAttributes extends Optional<ProductResourceAttributes, 'id' | 'deletedAt'> {}

class ProductResource extends Model<ProductResourceAttributes, ProductResourceCreationAttributes> implements ProductResourceAttributes {
  public id!: number;
  public product_id!: number;
  public file_name!: string;
  public url!: string;
  public width!: number;
  public height!: number;
  public size!: number;
  public resource_type!: string;
  public public_id!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt?: Date | null;
}

ProductResource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    file_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    resource_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    public_id: {
      type: DataTypes.STRING,
      allowNull: false,
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
    },
  },
  {
    sequelize,
    modelName: 'product_resources', // Adjust the model name as per your preference
    timestamps: true,
    paranoid: true,
  }
);

export default   ProductResource ;
export type { ProductResourceAttributes, ProductResourceCreationAttributes };

