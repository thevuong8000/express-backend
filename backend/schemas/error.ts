interface IHttpRequestError {
  message: string;
  code: number;
}

class BadRequestError implements IHttpRequestError {
  message: string;
  code: number;
  constructor(message: string) {
    this.message = message;
    this.code = 400;
  }
}

class UnauthorizedError implements IHttpRequestError {
  message: string;
  code: number;
  constructor(message: string) {
    this.message = message;
    this.code = 401;
  }
}

export { IHttpRequestError, BadRequestError, UnauthorizedError };
