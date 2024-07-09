"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
const sendErrorDev = (error, res) => {
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
const sendErrorProd = (error, res) => {
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
const globalErrorHandler = (err, req, res, next) => {
    if (err.name === "JsonWebTokenError") {
        err = new appError_1.default("Invalid token", 401);
    }
    if (err.name === "SequelizeValidationError") {
        err = new appError_1.default(err.errors[0].message, 400);
    }
    if (err.name === "SequelizeUniqueConstraintError") {
        err = new appError_1.default(err.errors[0].message, 400);
    }
    if (process.env.NODE_ENV === "development") {
        return sendErrorDev(err, res);
    }
    sendErrorProd(err, res);
};
module.exports = globalErrorHandler;
//# sourceMappingURL=errorController.js.map