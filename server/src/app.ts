import "dotenv/config"
import express, { NextFunction, Request } from "express";
import cors from "cors"
import catchAsync from '../src/utils/catchAsync';
require("dotenv").config({ path: `${process.cwd()}/.env` });
import AppError from "../src/utils/appError";

// ROUTER
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
//port tcp
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors())

// SWAGGER
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger/swaggerOptions");
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);


// OTHER ROUTES
app.use(
    "*",
    catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    })
  );

app.listen(PORT, () => {

    console.log(`Server listen on ${process.env.PORT}`)

})