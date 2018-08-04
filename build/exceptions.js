"use strict";
// tslint:disable:max-classes-per-file
Object.defineProperty(exports, "__esModule", { value: true });
class NotFound extends Error {
    constructor(message) {
        super(message);
        this.message = message ? message : 'Resource not found';
        this.status = 404;
    }
}
exports.NotFound = NotFound;
class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.message = message ? message : 'Internal server error';
        this.status = 500;
    }
}
exports.InternalServerError = InternalServerError;
class Forbidden extends Error {
    constructor(message) {
        super(message);
        this.message = message ? message : 'Forbidden';
        this.status = 403;
    }
}
exports.Forbidden = Forbidden;
class Unauthorized extends Error {
    constructor(message) {
        super(message);
        this.message = message ? message : 'Unauthorized';
        this.status = 401;
    }
}
exports.Unauthorized = Unauthorized;
class BadRequest extends Error {
    constructor(message) {
        super(message);
        this.message = message ? message : 'Bad request';
        this.status = 400;
    }
}
exports.BadRequest = BadRequest;
