export class AppError extends Error {
    constructor(message, statusCode, status = null) {
        super(message);
        this.statusCode = statusCode;
        this.status = status || (statusCode >= 500 ? 'error' : 'fail');
        Error.captureStackTrace(this, this.constructor);
    }
}
