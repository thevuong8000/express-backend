export class IHttpRequestError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export class BadRequestError extends IHttpRequestError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends IHttpRequestError {
  constructor(message: string) {
    super(message, 401);
  }
}
