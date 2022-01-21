import { HttpError } from './http.error';
export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized! 🛑') {
    const status = 401;

    const name = 'UnauthorizedError';

    super(message, status, name);
  }
}
