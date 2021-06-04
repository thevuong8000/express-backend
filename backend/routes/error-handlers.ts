import { IHttpRequestError } from '../schemas/error';
import { NextFunction, Response, Request } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof IHttpRequestError) {
    return res.status(err.code).send({ message: err.message });
  }
  return next(err);
};

export default errorHandler;
