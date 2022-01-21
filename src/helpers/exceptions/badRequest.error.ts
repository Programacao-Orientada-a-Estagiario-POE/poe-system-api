import { HttpError } from './http.error';

export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad Request! 🤪') {
    const status = 400;

    const name = 'BadRequestError';

    super(message, status, name);
  }
}
