import { IHttpRequestError } from 'schemas/error';
import { NextFunction, Response, Request } from 'express';

export const errorHandler = (
  err: IHttpRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.code || 400).send({ message: err.message });
};
