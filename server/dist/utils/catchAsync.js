"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (fn) => {
    const errorHandler = (req, res, next) => {
        fn(req, res, next).catch(next);
    };
    return errorHandler;
};
module.exports = catchAsync;
exports.default = catchAsync;
//# sourceMappingURL=catchAsync.js.map