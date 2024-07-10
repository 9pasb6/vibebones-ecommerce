/// <reference types="qs" />
import { Request, Response, NextFunction } from 'express';
/**
 * Elimina un producto del carrito.
 */
declare const deleteProductFromCart: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
export default deleteProductFromCart;
