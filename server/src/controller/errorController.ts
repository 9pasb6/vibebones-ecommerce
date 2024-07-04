// const AppError = require("../utils/appError");
import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';

const sendErrorDev = (error: AppError, res: Response) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  const message = error.message;
  const stack = error.stack;

  return res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

const sendErrorProd = (error: AppError, res: Response) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  const message = error.message;
  const stack = error.stack;

  if (error.isOperational) {
    res.status(statusCode).json({
      status,
      message,
    });
  }

  // Puede usarse un logger como winston para guardar los errores en un archivo
  console.log(error.name, error.message, stack);

  return res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "JsonWebTokenError") {
    err = new AppError("Invalid token", 401);
  }
  if (err.name === "SequelizeValidationError") {
    err = new AppError(err.errors[0].message, 400);
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    err = new AppError(err.errors[0].message, 400);
  }

  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(err, res);
  }
  sendErrorProd(err, res);
};

module.exports = globalErrorHandler;
