/// <reference types="qs" />
import { Request, Response, NextFunction } from 'express';
/**
 * Recupera un producto por su ID.
 */
declare const getProductById: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
/**
 * Crea un nuevo producto.
 */
declare const createProduct: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
/**
 * Actualiza un producto existente.
 */
declare const updateProduct: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
/**
 * Elimina un producto existente.
 */
declare const deleteProduct: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
/**
 * Recupera todos los productos.
 */
declare const getAllProducts: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
/**
 * Recupera todos los productos de un inventario.
 */
declare const getProductsByInventory: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
/**
 * Recupera todos los productos asociados a un usuario.
 */
declare const getProductsByUser: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export { getProductById, createProduct, updateProduct, deleteProduct, getAllProducts, getProductsByInventory, getProductsByUser, };
