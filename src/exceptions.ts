// tslint:disable:max-classes-per-file

class NotFound extends Error {
  private status: number

  constructor(message?: string) {
    super(message)
    this.message = message ? message : 'Resource not found'
    this.status = 404
  }
}

class InternalServerError extends Error {
  private status: number

  constructor(message?: string) {
    super(message)
    this.message = message ? message : 'Internal server error'
    this.status = 500
  }
}

class Forbidden extends Error {
  private status: number

  constructor(message?: string) {
    super(message)
    this.message = message ? message : 'Forbidden'
    this.status = 403
  }
}

class Unauthorized extends Error {
  private status: number

  constructor(message?: string) {
    super(message)
    this.message = message ? message : 'Unauthorized'
    this.status = 401
  }
}

class BadRequest extends Error {
  private status: number

  constructor(message?: string) {
    super(message);
    this.message = message ? message : 'Bad request'
    this.status = 400
  }
}

export { NotFound, InternalServerError, Forbidden, Unauthorized, BadRequest }