import { NextFunction, Response, Request } from 'express';
import { BaseError } from './api/responses/errors';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BaseError) {
    return res.status(err.code).send({ message: err.message });
  }
  return next(err);
};

export default errorHandler;
