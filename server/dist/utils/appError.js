"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode.toString().startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        // Ensure the stack trace is captured correctly
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
module.exports = AppError;
//# sourceMappingURL=appError.js.map