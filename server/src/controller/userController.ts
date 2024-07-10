// Models
const db = require("../db/models/index");
import { Request, Response } from 'express';

// External Libraries
const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

// Utilities
import catchAsync from '../utils/catchAsync';

// Error Handling
import AppError from "../utils/appError";

// ----------------------------------------------

// Retrieve all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
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

// Retrieve a user by ID
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await db.users.findByPk(id, {
    attributes: { exclude: ["password", "deletedAt"] },
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return res.status(200).json({
    status: "success",
    data: user,
  });
});


// Update a user by ID
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userType,  commerceName, password, confirmPassword } = req.body;

  if (password && password !== confirmPassword) {
    throw new AppError("Passwords do not match", 400);
  }

  const user = await db.users.findByPk(id);
  if (!user) {
    throw new AppError("User not found to update", 404);
  }

  try {
    const updatedUser = await user.update({
      userType,
      commerceName,
      password: password ? password : user.password,
    });
  
    return res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al actualizar al usuario",
    });
  }
});

// Delete a user by ID
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await db.users.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.update({
      status: false,
    });
    await user.destroy();

    return res.status(200).json({
      status: "success",
      message: "Usuario eliminado exitosamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al eliminar usuario",
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  // assignMallsToUser, // existing function
};
