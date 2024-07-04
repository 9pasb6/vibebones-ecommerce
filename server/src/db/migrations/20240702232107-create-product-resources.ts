// migrations/20240702143000-create-product-resources.ts

'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.createTable('product_resources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.dropTable('product_resources');
  }
};
