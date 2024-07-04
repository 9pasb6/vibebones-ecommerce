import { NextFunction, Response } from 'express';
/**
 * Función de registro que maneja la creación de nuevos usuarios
 */
export declare const signup: any;
/**
 * Función de inicio de sesión que maneja la autenticación de usuarios
 */
export declare const login: any;
/**
 * Función de refresco que maneja la generación de nuevos tokens de acceso
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 */
export declare const refresh: any;
/**
 * Función de autenticación que verifica si el usuario está autenticado
 */
export declare const authentication: any;
/**
 * Función de perfil que obtiene la información del usuario autenticado
 */
export declare const profile: any;
/**
 * Función restrictTo que verifica si el usuario tiene permisos para realizar una acción
 * @param  {...any} userType
 * @returns
 */
export declare const restrictTo: (...userType: string[]) => (req: any, res: Response, next: NextFunction) => void;
