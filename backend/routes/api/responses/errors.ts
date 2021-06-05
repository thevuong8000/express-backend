import { BaseError } from '@schemas/error';

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class UnprocessableError extends BaseError {
  constructor(message: string) {
    super(message, 422);
  }
}

export class ServerError extends BaseError {
  constructor(message: string) {
    super(message, 500);
  }
}
