import { HttpError } from './http.error';
export class ExternalError extends HttpError {
  constructor(message: string = 'External error 🛸') {
    const status = 502;

    const name = 'ExternalError';

    super(message, status, name);
  }
}
