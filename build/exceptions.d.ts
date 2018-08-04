declare class NotFound extends Error {
    private status;
    constructor(message: string);
}
declare class InternalServerError extends Error {
    private status;
    constructor(message: string);
}
declare class Forbidden extends Error {
    private status;
    constructor(message: string);
}
declare class Unauthorized extends Error {
    private status;
    constructor(message: string);
}
declare class BadRequest extends Error {
    private status;
    constructor(message: string);
}
export { NotFound, InternalServerError, Forbidden, Unauthorized, BadRequest };
