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
exports.restrictTo = exports.profile = exports.authentication = exports.refresh = exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db = require('../db/models/index');
// import db from '../db/models/index';
// import catchAsync from '../utils/catchAsync';
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
/**
 * Función de registro que maneja la creación de nuevos usuarios
 */
exports.signup = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { userType, email, commerceName, password, confirmPassword, status } = req.body;
    // Validaciones básicas
    if (!userType || !email || !commerceName || !password || !confirmPassword || !status) {
        throw new AppError('Todos los campos son obligatorios', 400);
    }
    if (userType !== 'LOCATION') {
        console.log(db.users);
        throw new AppError('Tipo de usuario no válido', 400);
    }
    if (password !== confirmPassword) {
        throw new AppError('Las contraseñas no coinciden', 400);
    }
    // Verificar si el usuario ya existe por email o nombre de comercio
    const commerceExists = yield db.users.findOne({
        where: {
            commerceName,
        },
    });
    if (commerceExists) {
        throw new AppError('El nombre del comercio ya está registrado', 400);
    }
    const userExists = yield db.users.findOne({
        where: {
            email,
        },
    });
    if (userExists) {
        throw new AppError('El correo electrónico ya está registrado', 400);
    }
    // Crear nuevo usuario
    try {
        const newUser = yield db.users.create({
            userType,
            email,
            commerceName,
            password: yield bcrypt_1.default.hash(password, 12),
            status
        });
    }
    catch (error) {
        return console.log(error);
    }
    // if (!newUser) {
    //   throw new AppError('Error al crear un nuevo usuario', 400);
    // }
    return res.status(201).json({
        status: 'success',
        message: 'Usuario creado con éxito',
    });
}));
/**
 * Función de inicio de sesión que maneja la autenticación de usuarios
 */
exports.login = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new AppError('El correo electrónico y la contraseña son obligatorios', 400);
    }
    const user = yield db.users.findOne({ where: { email } });
    if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
        throw new AppError('Correo electrónico o contraseña no válidos', 401);
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
exports.refresh = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        throw new AppError('Refresh token es obligatorio', 400);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_SECRET_KEY);
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
        throw new AppError('Refresh token no válido o ha expirado', 401);
    }
}));
/**
 * Función de autenticación que verifica si el usuario está autenticado
 */
exports.authentication = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Obtener el token de los encabezados
    let idToken = '';
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        idToken = req.headers.authorization.split(' ')[1];
    }
    if (!idToken) {
        return next(new AppError('Por favor inicie sesión para obtener acceso', 401));
    }
    // 2. Verificación del token
    const tokenDetail = jsonwebtoken_1.default.verify(idToken, process.env.JWT_SECRET_KEY);
    // 3. Obtener los detalles del usuario de la base de datos y agregar al objeto req
    const freshUser = yield db.users.findByPk(tokenDetail.id);
    if (!freshUser) {
        return next(new AppError('El usuario ya no existe', 400));
    }
    req.user = freshUser;
    return next();
}));
/**
 * Función de perfil que obtiene la información del usuario autenticado
 */
exports.profile = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new AppError('Usuario no encontrado', 404));
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
            return next(new AppError('No tienes permiso para realizar esta acción', 403));
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
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET_KEY, {
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