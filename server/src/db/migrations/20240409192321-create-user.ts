// migrations/20240629175500-create-users.ts

'use strict';
/** @type {import('sequelize-cli').Migration} */
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userType: {
        type: DataTypes.ENUM('ADMIN', 'USER', 'LOCATION'),
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      commerceName: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      status:{
        type: DataTypes.BOOLEAN,
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
    await queryInterface.dropTable('users');
  }
};
