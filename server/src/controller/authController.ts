import { NextFunction, Request, Response } from 'express';
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');
const db = require('../db/models/index');
import catchAsync from '../utils/catchAsync';
import AppError from "../utils/appError";
import { emailRecoverPassword } from '../utils/emailProvider';
import { DB } from '../db/types';


/**
 * Función para recuperar la contraseña
 */
export const recoverPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  // Verificar si el usuario existe
  const user = await db.users.findOne({ where: { email } });
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
    emailRecoverPassword(user);

    res.json({ 
      msg: "Ahora, revisa tu correo electrónico" ,
      accessToken: accessToken,
      refreshToken: refreshToken
        });
  } catch (error) {
    console.log(error);
    return next(new AppError('Error al recuperar la contraseña, por favor intente nuevamente', 500));
  }
});

/**
 * Función de registro que maneja la creación de nuevos usuarios
 */
export const signup = catchAsync(async (req: any, res: Response, next: NextFunction) => {
  
  console.log(req.body)
  const { userType, email, commerceName, password, confirmPassword, status } = req.body;

  
  if (userType !== 'USER') {
    
    throw new AppError('Tipo de usuario no válido', 400);
    
  }

  try {
    // Verificar si el correo electrónico ya está en uso (activo o eliminado)
    const existingUser = await db.users.findOne({
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
    const newUser = await db.users.create({
      userType,
      email,
      commerceName,
      password: await bcrypt.hash(password, 12),
      status,
    });

    return res.status(201).json({
      status: "success",
      message: "Usuario creado exitosamente",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al crear usuario",
    });
  }
});

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
export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render('login', { title: 'Login', error: 'El correo electrónico y la contraseña son obligatorios' });
  }

  const user = await db.users.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) { //TODO: recuperar cuenta
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
// export const authentication = catchAsync(async (req: any, res: Response, next: NextFunction) => {
//   // 1. Obtener el token de los encabezados
//   let idToken = '';
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     idToken = req.headers.authorization.split(' ')[1];
//   }
//   if (!idToken) {
//     return next(new AppError('Por favor inicie sesión para obtener acceso', 401));
//   }

//   // 2. Verificación del token
//   const tokenDetail: any = jwt.verify(idToken, process.env.JWT_SECRET_KEY as string);

//   // 3. Obtener los detalles del usuario de la base de datos y agregar al objeto req
//   const freshUser = await db.users.findByPk(tokenDetail.id);

//   if (!freshUser) {
//     return next(new AppError('El usuario ya no existe', 400));
//   }
//   req.user = freshUser;
//   return next();
// });


declare module 'express' {
  interface Request {
    user?: any;
   }
}


export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  let token = '';

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return next(new AppError('Por favor inicie sesión para obtener acceso', 401));
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    const freshUser = await db.users.findByPk(decoded.id);

    if (!freshUser) {
      return next(new AppError('El usuario ya no existe', 400));
    }

    req.user = freshUser;
    console.log(req.user); // Verifica que el campo role esté presente
    next();
  } catch (err) {
    return next(new AppError('Token inválido o expirado', 401));
  }
};


export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies && req.cookies.accessToken) {
    try {
      jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET_KEY as string);
      return res.redirect('/api/v1/view'); // Redirigir a la página principal si el usuario está autenticado
    } catch (err) {
      return next(); // Token inválido o expirado, permitir acceso a la página de login
    }
  } else {
    next(); // No hay token, permitir acceso a la página de login
  }
};

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
