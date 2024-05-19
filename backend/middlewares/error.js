class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error",

        err.statusCode = err.statusCode || 500;

    if (err.name === "CaseError") {
        const message = `Resource not Found .Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    if (err.name === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "JsonWebTokenError") {
        const message = `json web token Invalid ,try Again`;
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
        const message = `Json web token is expaired : Try again`;
        err = new ErrorHandler(message, 400);
    }
    return res.status(err.statusCode).json({
        success : false,
        message:err.message,
    })

}
export default ErrorHandler