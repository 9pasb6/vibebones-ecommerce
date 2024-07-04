import bcrypt from "bcrypt";
import { QueryInterface, Sequelize } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    let password = process.env.ADMIN_PASSWORD as string;
    const hashPassword = bcrypt.hashSync(password, 10);
    return queryInterface.bulkInsert("users", [
      {
        userType: "ADMIN",
        email: process.env.ADMIN_EMAIL as string,
        commerceName: "Admin",
        password: hashPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
    // Delete all admin users
    return queryInterface.bulkDelete("users", { userType: "ADMIN" }, {});
  },
};
