import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import catchAsync from '../src/utils/catchAsync';
import AppError from "../src/utils/appError";
import { create } from 'express-handlebars';
import path from 'path';
import cookieParser from 'cookie-parser';

require("dotenv").config({ path: `${process.cwd()}/.env` });

// ROUTER
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");
const purchaseRouter = require("./routes/purchaseRoute");
const viewRouter = require("./routes/viewRoute");

// PORT TCP
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// HANDLEBARS
const { eq } = require('./helpers/handlebars');
const hbs = create({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    eq: eq
  }
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use((req, res, next) => {
  if (req.url.endsWith('.map')) {
    res.status(404).end(); // Responder con 404 Not Found para archivos .map
  } else {
    next(); // Pasar al siguiente middleware para otras solicitudes
  }
});
app.use(express.static(path.join(__dirname, 'public')));

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
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/purchases", purchaseRouter);
app.use("/api/v1/view", viewRouter);

// OTHER ROUTES
app.use(
  "*",
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
