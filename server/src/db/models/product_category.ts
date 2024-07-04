import { Optional } from "sequelize";
const { DataTypes, Model }  = require ('sequelize');
const  sequelize  = require('../../config/database');

// Interfaces
interface ProductCategoryAttributes {
  product_id: number;
  category_id: number;
}

interface ProductCategoryCreationAttributes extends ProductCategoryAttributes {}

class ProductCategory extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes> implements ProductCategoryAttributes {
  public product_id!: number;
  public category_id!: number;
}

ProductCategory.init(
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
    category_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    paranoid: false,
    timestamps: false,
    modelName: 'product_category',
    freezeTableName: true,
  }
);


export default ProductCategory; 
export type {  ProductCategoryAttributes, ProductCategoryCreationAttributes };
