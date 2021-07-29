import { UnauthorizedError } from './errors';

export class LoginErrorResponse {
  static failedToVerify() {
    return new UnauthorizedError('Username or password is not correct!');
  }

  static invalidToken() {
    return new UnauthorizedError('Token is either invalid or expired!');
  }
}
