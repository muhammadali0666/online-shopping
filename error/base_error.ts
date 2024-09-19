export default class BaseError extends Error {
  status: number;
  errors: any[];
  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  static UnauthorizedError(): BaseError {
    return new BaseError(401, "User not authorized");
  }

  static BadRequest(message: string, errors: any[] = []): BaseError {
    return new BaseError(400, message, errors);
  }
}
