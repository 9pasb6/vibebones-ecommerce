// Models
const db = require("../db/models/index");
import { Request, Response} from 'express';

// External Libraries
const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

// Utilities
const catchAsync = require("../utils/catchAsync");

// Error Handling
const AppError = require("../utils/appError");

// ----------------------------------------------

/**
 * Retrieves all users.
 */
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const users = await db.users.findAndCountAll({
    where: {
      userType: {
        [Sequelize.Op.ne]: "ADMIN",
      },
    },
    attributes: { exclude: ["password", "deletedAt"] },
  });
  return res.status(200).json({
    status: "success",
    data: users,
  });
});

// ----------------------------------------------

/**
 * Assigns malls to a user.
 */
const assignMallsToUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { malls } = req.body; // array of mall ids

  // Iniciar transacción
  await sequelize.transaction(async (t:any) => {
    // Verificar la existencia del usuario
    const foundUser = await db.users.findByPk(userId, { transaction: t });
    if (!foundUser) {
      throw new AppError("User not found", 404);
    }

    // Verificar que todos los malls existan utilizando una consulta de conteo
    const foundMallsCount = await db.malls.count({
      where: {
        id: malls,
      },
      transaction: t,
    });

    if (foundMallsCount !== malls.length) {
      throw new AppError("One or more malls not found", 404);
    }

    // Eliminar asignaciones de malls existentes
    await db.mall_user.destroy({
      where: {
        user_id: userId,
      },
      transaction: t,
    });

    // Crear nuevas asociaciones
    const newAssociations = malls.map((mallId: number) => ({
      user_id: userId,
      mall_id: mallId,
    }));

    // Asignar nuevos malls al usuario
    await db.mall_user.bulkCreate(newAssociations, { transaction: t });
  });

  // Responder con éxito
  return res.status(200).json({
    status: "success",
    message: "Malls assigned to user successfully",
  });
});

module.exports = { getAllUser, assignMallsToUser };
