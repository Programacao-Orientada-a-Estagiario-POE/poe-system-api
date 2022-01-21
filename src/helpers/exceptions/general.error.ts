
export class GeneralError extends Error {
  private readonly errors: any;

  private readonly code: number;

  constructor(message?: string, code?: number, errors?: any) {
    super();
    this.errors = errors;
    this.message = message || 'Server error! ⚠️';
    this.code = code || 500;
  }

  getCode(): number {
    return this.code;
  }

  getErrors(): any {
    return this.errors;
  }

  getMessage(): string {
    return this.message;
  }
}
