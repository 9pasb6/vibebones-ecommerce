import { NextFunction, Request, Response } from 'express';
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');
const db = require('../db/models/index');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError') ;


/**
 * Función de registro que maneja la creación de nuevos usuarios
 */
export const signup = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  
  console.log(req.body)
  const { userType, email, commerceName, password, confirmPassword, status } = req.body;

  // Validaciones básicas
  if (!userType || !email || !commerceName || !password || !confirmPassword || !status) {
    throw new AppError('Todos los campos son obligatorios', 400);
  }

  if (userType !== 'LOCATION') {
    console.log(db.users)
    throw new AppError('Tipo de usuario no válido', 400);
    
  }

  if (password !== confirmPassword) {
    throw new AppError('Las contraseñas no coinciden', 400);
  }

 
  // Verificar si el usuario ya existe por email o nombre de comercio
  const commerceExists = await db.users.findOne({
    where: {
      commerceName,
    },
  });

   

  if (commerceExists) {
    throw new AppError('El nombre del comercio ya está registrado', 400);
  }

  const userExists = await db.users.findOne({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new AppError('El correo electrónico ya está registrado', 400);
  }

  // Crear nuevo usuario
  const newUser = await db.users.create({
    userType,
    email,
    commerceName,
    password: await bcrypt.hash(password, 12),
    status
  });

  if (!newUser) {
    throw new AppError('Error al crear un nuevo usuario', 400);
  }

  return res.status(201).json({
    status: 'success',
    message: 'Usuario creado con éxito',
  });
});

/**
 * Función de inicio de sesión que maneja la autenticación de usuarios
 */
export const login = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError('El correo electrónico y la contraseña son obligatorios', 400);
  }

  const user = await db.users.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
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
});

/**
 * Función de refresco que maneja la generación de nuevos tokens de acceso
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 */
export const refresh = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError('Refresh token es obligatorio', 400);
  }

  try {
    const decoded: any = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY as string);

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
  } catch (err) {
    throw new AppError('Refresh token no válido o ha expirado', 401);
  }
});

/**
 * Función de autenticación que verifica si el usuario está autenticado
 */
export const authentication = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  // 1. Obtener el token de los encabezados
  let idToken = '';
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    idToken = req.headers.authorization.split(' ')[1];
  }
  if (!idToken) {
    return next(new AppError('Por favor inicie sesión para obtener acceso', 401));
  }

  // 2. Verificación del token
  const tokenDetail: any = jwt.verify(idToken, process.env.JWT_SECRET_KEY as string);

  // 3. Obtener los detalles del usuario de la base de datos y agregar al objeto req
  const freshUser = await db.users.findByPk(tokenDetail.id);

  if (!freshUser) {
    return next(new AppError('El usuario ya no existe', 400));
  }
  req.user = freshUser;
  return next();
});

/**
 * Función de perfil que obtiene la información del usuario autenticado
 */
export const profile = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError('Usuario no encontrado', 404));
  }

  // Eliminar datos sensibles
  const userToReturn = { ...req.user.toJSON() };
  delete userToReturn.password;
  delete userToReturn.confirmPassword;
  delete userToReturn.deletedAt;

  res.status(200).json({
    status: 'success',
    data: userToReturn,
  });
});

/**
 * Función restrictTo que verifica si el usuario tiene permisos para realizar una acción
 * @param  {...any} userType
 * @returns
 */
export const restrictTo = (...userType: string[]) => {
  const checkPermission = (req: any, res: Response, next: NextFunction) => {
    if (!userType.includes(req.user?.userType)) {
      return next(
        new AppError('No tienes permiso para realizar esta acción', 403)
      );
    }
    return next();
  };

  return checkPermission;
};

/**
 * Función que genera un token
 * @param {*} payload
 * @param {*} expiresIn
 * @returns
 */
const generateToken = (payload: any, expiresIn: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
    expiresIn: expiresIn,
  });
};

/**
 * Función que genera un token de acceso
 * @param {*} payload
 * @returns
 */
const generateAccessToken = (payload: any) => {
  return generateToken(payload, process.env.JWT_EXPIRES_IN);
};

/**
 * Función que genera un token de refresco
 * @param {*} payload
 * @returns
 */
const generateRefreshToken = (payload: any) => {
  return generateToken(payload, process.env.JWT_REFRESH_EXPIRES_IN);
};
