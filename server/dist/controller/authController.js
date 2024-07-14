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
exports.restrictTo = exports.profile = exports.isAuthenticated = exports.authentication = exports.refresh = exports.login = exports.signup = exports.recoverPassword = void 0;
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
    if (userType !== 'USER') {
        throw new appError_1.default('Tipo de usuario no válido', 400);
    }
    try {
        // Verificar si el correo electrónico ya está en uso (activo o eliminado)
        const existingUser = yield db.users.findOne({
            where: {
                email,
            },
            paranoid: false, // incluir registros eliminados
        });
        //el usuario existe y esta activo
        if (existingUser && existingUser.status === true) {
            return res.status(400).json({
                message: "El correo electrónico ya está registrado",
            });
        }
        //el usuario existe y pero esta inactivo
        if (existingUser && existingUser.status !== true) {
            return res.status(400).json({
                message: "El correo electrónico ya ha sido registrado, desea reactivar su cuenta?",
            });
        }
        // Crear nuevo usuario
        const newUser = yield db.users.create({
            userType,
            email,
            commerceName,
            password: yield bcrypt.hash(password, 12),
            status,
        });
        return res.status(201).json({
            status: "success",
            message: "Usuario creado exitosamente",
            data: newUser,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error al crear usuario",
        });
    }
}));
/**
 * Función de inicio de sesión que maneja la autenticación de usuarios
 */
// export const login = catchAsync(async (req: any, res: Response, next: NextFunction) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     throw new AppError('El correo electrónico y la contraseña son obligatorios', 400);
//   }
//   const user = await db.users.findOne({ where: { email } });
//   if (!user || !(await bcrypt.compare(password, user.password))) { //TODO: recuperar cuenta
//     throw new AppError('Correo electrónico o contraseña no válidos', 401);
//   }
//   const payload = {
//     id: user.id,
//     role: user.userType,
//     username: user.commerceName,
//   };
//   const accessToken = generateAccessToken(payload);
//   const refreshToken = generateRefreshToken(payload);
//   return res.status(200).json({
//     status: 'success',
//     accessToken: accessToken,
//     refreshToken: refreshToken,
//   });
// });
/**
 * Función de inicio de sesión que maneja la autenticación de usuarios usando handlebars
 */
exports.login = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.render('login', { title: 'Login', error: 'El correo electrónico y la contraseña son obligatorios' });
    }
    const user = yield db.users.findOne({ where: { email } });
    if (!user || !(yield bcrypt.compare(password, user.password))) { //TODO: recuperar cuenta
        return res.render('login', { title: 'Login', error: 'Correo electrónico o contraseña no válidos' });
    }
    const payload = {
        id: user.id,
        role: user.userType,
        username: user.commerceName,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    // Enviar los tokens al cliente
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
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }
    if (!token) {
        return next(new appError_1.default('Por favor inicie sesión para obtener acceso', 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const freshUser = yield db.users.findByPk(decoded.id);
        if (!freshUser) {
            return next(new appError_1.default('El usuario ya no existe', 400));
        }
        req.user = freshUser;
        console.log(req.user); // Verifica que el campo role esté presente
        next();
    }
    catch (err) {
        return next(new appError_1.default('Token inválido o expirado', 401));
    }
});
exports.authentication = authentication;
const isAuthenticated = (req, res, next) => {
    if (req.cookies && req.cookies.accessToken) {
        try {
            jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET_KEY);
            return res.redirect('/api/v1/view'); // Redirigir a la página principal si el usuario está autenticado
        }
        catch (err) {
            return next(); // Token inválido o expirado, permitir acceso a la página de login
        }
    }
    else {
        next(); // No hay token, permitir acceso a la página de login
    }
};
exports.isAuthenticated = isAuthenticated;
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