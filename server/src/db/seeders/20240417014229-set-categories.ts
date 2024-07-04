"use strict";
import { QueryInterface } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize:any) {
    return queryInterface.bulkInsert("categories", [
      {
        name: "Electronics",
      },
      {
        name: "Clothing",
      },
      {
        name: "Furniture",
      },
      {
        name: "Books",
      },
      {
        name: "Toys",
      },
      {
        name: "Food",
      },
    ]);
  },

  async down(queryInterface: QueryInterface, Sequelize:any) {
    return queryInterface.bulkDelete("categories",  {});
  },
};