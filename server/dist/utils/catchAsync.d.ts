import { Request, Response, NextFunction, RequestHandler } from 'express';
declare const catchAsync: (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => RequestHandler;
export default catchAsync;
