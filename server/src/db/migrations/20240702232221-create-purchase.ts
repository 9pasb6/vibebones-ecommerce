// migrations/20240702143500-create-purchases.ts

'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.createTable('purchases', {
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'carts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable('purchases');
  }
};
