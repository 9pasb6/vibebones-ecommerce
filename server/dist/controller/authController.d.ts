/// <reference types="qs" />
import { NextFunction, Request, Response } from 'express';
/**
 * Función para recuperar la contraseña
 */
export declare const recoverPassword: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
/**
 * Función de registro que maneja la creación de nuevos usuarios
 */
export declare const signup: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
/**
 * Función de inicio de sesión que maneja la autenticación de usuarios
 */
export declare const login: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
/**
 * Función de refresco que maneja la generación de nuevos tokens de acceso
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 */
export declare const refresh: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
/**
 * Función de autenticación que verifica si el usuario está autenticado
 */
export declare const authentication: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
/**
 * Función de perfil que obtiene la información del usuario autenticado
 */
export declare const profile: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
/**
 * Función restrictTo que verifica si el usuario tiene permisos para realizar una acción
 * @param  {...any} userType
 * @returns
 */
export declare const restrictTo: (...userType: string[]) => (req: any, res: Response, next: NextFunction) => void;
