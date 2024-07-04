// models/Category.ts

import { DataTypes, Model, Optional } from 'sequelize';
const  sequelize  = require('../../config/database');

// These are all the attributes in the Category model
interface CategoryAttributes {
  id: number;
  name: string;
}

// These are the attributes that are allowed to be set when creating a new Category instance
interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public id!: number;
  public name!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'categories', // Adjust the model name as per your preference
    timestamps: false,
  }
);
export default  Category;
export type { CategoryAttributes, CategoryCreationAttributes };
