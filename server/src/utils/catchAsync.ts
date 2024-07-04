import { Request, Response, NextFunction, RequestHandler } from 'express';

const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => {
  const errorHandler: RequestHandler = (req, res, next) => {
    fn(req, res, next).catch(next);
  };

  return errorHandler;
};

module.exports = catchAsync;
export default catchAsync;