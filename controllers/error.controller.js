const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const { AppError } = require("../utils/appError.util");

const sendErrorDev = (error, req, res) => {
    res.status(error.statusCode || 500).json({
        status: error.status || "fail",
        message: error.message,
        error,
        stack: error.stack
    });
};

const serndErrorProd = (error, req, res) => {
    res.status(error.statusCode || 500).json({
        status: error.status || "fail",
        message: error.message || "Something went wrong"
    });
};

const tokenExpiredError = () => {
    return new AppError("Session expired", 403);
};

const tokenInvalidSignatureError = () => {
    return new AppError("Session Invalid", 403);
};

const dbUniqueConstraintError = () => {
    return new AppError("The entered email has already been taken", 400);
};

const limitImgsError = () => {
    return new AppError("You can only upload 3 imgs", 400);
}

const globalErrorHanddler = (error, req, res, next) => {
    if(process.env.NODE_ENV === "development"){
        sendErrorDev(error, req, res)
    } else if(process.env.NODE_ENV === "production") {

        let err = { ...error };

        if(error.name === "TokenExpiredError"){
            err = tokenExpiredError()
        } else if(error.name === "JsonWebTokenError"){
            err = tokenInvalidSignatureError
        } else if (error.name === "SequelizeUniqueConstraintError") {
            err = dbUniqueConstraintError();
        } else if (error.code === "LIMIT_UNEXPECTED_FILE"){
            err = limitImgsError();
        }

        serndErrorProd(err, req, res)
    }
}

module.exports = { globalErrorHanddler };