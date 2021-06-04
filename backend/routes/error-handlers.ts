import { IHttpRequestError } from 'schemas/error';
import { NextFunction, Response, Request } from 'express';

const errorHandler = (err: IHttpRequestError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.code || 500).send({ message: err.message });
};

export default errorHandler;
