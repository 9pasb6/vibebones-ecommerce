// migrations/20240702142000-create-inventory-products.ts

'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.createTable('inventory_products', {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      inventory_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'inventories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable('inventory_products');
  }
};
