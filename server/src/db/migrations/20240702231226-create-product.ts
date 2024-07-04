// migrations/20240702140500-create-products.ts

'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.createTable('products', {
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
          model: 'categories', // Asegúrate que coincida con el nombre de tu tabla de categorías
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable('products');
  }
};
