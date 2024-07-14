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
const catchAsync_1 = __importDefault(require("../src/utils/catchAsync"));
const appError_1 = __importDefault(require("../src/utils/appError"));
const express_handlebars_1 = require("express-handlebars");
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
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
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// HANDLEBARS
const { eq } = require('./helpers/handlebars');
const hbs = (0, express_handlebars_1.create)({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path_1.default.join(__dirname, 'views/layouts'),
    partialsDir: path_1.default.join(__dirname, 'views/partials'),
    helpers: {
        eq: eq
    }
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path_1.default.join(__dirname, 'views'));
// Servir archivos estáticos
app.use((req, res, next) => {
    if (req.url.endsWith('.map')) {
        res.status(404).end(); // Responder con 404 Not Found para archivos .map
    }
    else {
        next(); // Pasar al siguiente middleware para otras solicitudes
    }
});
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
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
app.use("*", (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    throw new appError_1.default(`Can't find ${req.originalUrl} on this server`, 404);
})));
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//# sourceMappingURL=app.js.map