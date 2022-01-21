import { HttpError } from './http.error';
export class NotFoundError extends HttpError {
  constructor(message: string = 'Not found! 😕') {
    const status = 404;

    const name = 'NotFoundError';

    super(message, status, name);
  }
}
