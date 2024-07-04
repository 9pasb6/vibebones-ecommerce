// migrations/20240629180000-create-categories.ts

'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.createTable('categories', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    });

    /*
    await queryInterface.bulkInsert('categories', [
      { name: CATEGORIES.ENTERTAINMENT },
      { name: CATEGORIES.FOOD },
      { name: CATEGORIES.SERVICES },
      { name: CATEGORIES.SPORTS },
      { name: CATEGORIES.TECHNOLOGY },
    ]);
    */
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
    /*
    await queryInterface.bulkDelete('categories', {
      name: { [Sequelize.Op.in]: [CATEGORIES.ENTERTAINMENT, CATEGORIES.FOOD, CATEGORIES.SERVICES, CATEGORIES.SPORTS, CATEGORIES.TECHNOLOGY] }
    });
    */
    await queryInterface.dropTable('categories');
  }
};
