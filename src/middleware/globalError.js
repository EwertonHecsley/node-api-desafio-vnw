const { Logger, Environment } = require('../config/validateEnviroment');

const globalErrorHandler = (err, req, res, next) => {
    Logger.error(`[${req.method}] ${req.url} - ${err.message}`);

    const statusCode = err.status || 500;

    const response = {
        status: 'error',
        message: statusCode === 500 ? 'Internal Server Error' : err.message
    };

    if (process.env.NODE_ENV === Environment.DEVELOPMENT) {
        response.stack = err.stack;
        response.details = err.details || null;
    }

    res.status(statusCode).json(response);
};

module.exports = {
    globalErrorHandler
}