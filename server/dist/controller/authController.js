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
exports.restrictTo = exports.profile = exports.authentication = exports.refresh = exports.login = exports.signup = exports.recoverPassword = void 0;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db/models/index');
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const emailProvider_1 = require("../utils/emailProvider");
/**
 * Función para recuperar la contraseña
 */
exports.recoverPassword = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    // Verificar si el usuario existe
    const user = yield db.users.findOne({ where: { email } });
    if (!user) {
        const error = new Error("El usuario no existe, por favor crea una cuenta");
        return res.status(404).json({ msg: error.message });
    }
    try {
        const payload = {
            id: user.id,
            role: user.userType,
            username: user.commerceName,
        };
        // // Generar un token de recuperación
        // user.token = generateJWT();
        // await user.save();
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        // Enviar email de recuperación de contraseña
        (0, emailProvider_1.emailRecoverPassword)(user);
        res.json({
            msg: "Ahora, revisa tu correo electrónico",
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }
    catch (error) {
        console.log(error);
        return next(new appError_1.default('Error al recuperar la contraseña, por favor intente nuevamente', 500));
    }
}));
/**
 * Función de registro que maneja la creación de nuevos usuarios
 */
exports.signup = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { userType, email, commerceName, password, confirmPassword, status } = req.body;
    // Validaciones básicas
    if (!userType || !email || !commerceName || !password || !confirmPassword || !status) {
        throw new appError_1.default('Todos los campos son obligatorios', 400);
    }
    if (userType !== 'USER') {
        console.log(db.users);
        throw new appError_1.default('Tipo de usuario no válido', 400);
    }
    if (password !== confirmPassword) {
        throw new appError_1.default('Las contraseñas no coinciden', 400);
    }
    // Verificar si el usuario ya existe por email o nombre de comercio
    const commerceExists = yield db.users.findOne({
        where: {
            commerceName,
        },
    });
    if (commerceExists) {
        throw new appError_1.default('El nombre del comercio ya está registrado', 400);
    }
    const userExists = yield db.users.findOne({
        where: {
            email,
        },
    });
    if (userExists) {
        throw new appError_1.default('El correo electrónico ya está registrado', 400);
    }
    // Crear nuevo usuario
    const newUser = yield db.users.create({
        userType,
        email,
        commerceName,
        password: yield bcrypt.hash(password, 12),
        status
    });
    if (!newUser) {
        throw new appError_1.default('Error al crear un nuevo usuario', 400);
    }
    return res.status(201).json({
        status: 'success',
        message: 'Usuario creado con éxito',
    });
}));
/**
 * Función de inicio de sesión que maneja la autenticación de usuarios
 */
exports.login = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new appError_1.default('El correo electrónico y la contraseña son obligatorios', 400);
    }
    const user = yield db.users.findOne({ where: { email } });
    if (!user || !(yield bcrypt.compare(password, user.password))) {
        throw new appError_1.default('Correo electrónico o contraseña no válidos', 401);
    }
    const payload = {
        id: user.id,
        role: user.userType,
        username: user.commerceName,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return res.status(200).json({
        status: 'success',
        accessToken: accessToken,
        refreshToken: refreshToken,
    });
}));
/**
 * Función de refresco que maneja la generación de nuevos tokens de acceso
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 */
exports.refresh = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        throw new appError_1.default('Refresh token es obligatorio', 400);
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
        const payload = {
            id: decoded.id,
            role: decoded.role,
            username: decoded.username,
        };
        const newAccessToken = generateAccessToken(payload);
        const newRefreshToken = generateRefreshToken(payload);
        return res.status(200).json({
            status: 'success',
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    }
    catch (err) {
        throw new appError_1.default('Refresh token no válido o ha expirado', 401);
    }
}));
/**
 * Función de autenticación que verifica si el usuario está autenticado
 */
exports.authentication = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Obtener el token de los encabezados
    let idToken = '';
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        idToken = req.headers.authorization.split(' ')[1];
    }
    if (!idToken) {
        return next(new appError_1.default('Por favor inicie sesión para obtener acceso', 401));
    }
    // 2. Verificación del token
    const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);
    // 3. Obtener los detalles del usuario de la base de datos y agregar al objeto req
    const freshUser = yield db.users.findByPk(tokenDetail.id);
    if (!freshUser) {
        return next(new appError_1.default('El usuario ya no existe', 400));
    }
    req.user = freshUser;
    return next();
}));
/**
 * Función de perfil que obtiene la información del usuario autenticado
 */
exports.profile = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new appError_1.default('Usuario no encontrado', 404));
    }
    // Eliminar datos sensibles
    const userToReturn = Object.assign({}, req.user.toJSON());
    delete userToReturn.password;
    delete userToReturn.confirmPassword;
    delete userToReturn.deletedAt;
    res.status(200).json({
        status: 'success',
        data: userToReturn,
    });
}));
/**
 * Función restrictTo que verifica si el usuario tiene permisos para realizar una acción
 * @param  {...any} userType
 * @returns
 */
const restrictTo = (...userType) => {
    const checkPermission = (req, res, next) => {
        var _a;
        if (!userType.includes((_a = req.user) === null || _a === void 0 ? void 0 : _a.userType)) {
            return next(new appError_1.default('No tienes permiso para realizar esta acción', 403));
        }
        return next();
    };
    return checkPermission;
};
exports.restrictTo = restrictTo;
/**
 * Función que genera un token
 * @param {*} payload
 * @param {*} expiresIn
 * @returns
 */
const generateToken = (payload, expiresIn) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: expiresIn,
    });
};
/**
 * Función que genera un token de acceso
 * @param {*} payload
 * @returns
 */
const generateAccessToken = (payload) => {
    return generateToken(payload, process.env.JWT_EXPIRES_IN);
};
/**
 * Función que genera un token de refresco
 * @param {*} payload
 * @returns
 */
const generateRefreshToken = (payload) => {
    return generateToken(payload, process.env.JWT_REFRESH_EXPIRES_IN);
};
//# sourceMappingURL=authController.js.map