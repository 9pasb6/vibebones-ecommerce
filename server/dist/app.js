"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const catchAsync = require('./utils/catchAsync');
require("dotenv").config({ path: `${process.cwd()}/.env` });
const AppError = require("./utils/appError");
// ROUTER
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
//port tcp
const PORT = process.env.PORT || 3002;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// SWAGGER
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger/swaggerOptions");
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
// OTHER ROUTES
app.use("*", catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
})));
app.listen(PORT, () => {
    console.log(process.env.DB_USERNAME);
    console.log(process.env.DB_PASSWORD);
    console.log(`Server listen on ${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map