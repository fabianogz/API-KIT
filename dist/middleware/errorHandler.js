"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = require("../utils/response");
const logger_1 = require("../utils/logger");
const config_1 = require("../config");
const errorHandler = (err, req, res, next) => {
    const errorId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    logger_1.logger.error('Unhandled error', {
        errorId,
        error: err.message,
        stack: config_1.config.nodeEnv === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        body: req.body,
        query: req.query,
        params: req.params,
        code: err.code,
        details: err.details
    });
    if (res.headersSent) {
        return next(err);
    }
    const statusCode = err.statusCode || 500;
    let message = 'Internal server error';
    if (statusCode < 500) {
        message = err.message || 'Bad request';
    }
    else if (config_1.config.nodeEnv === 'development') {
        message = err.message || 'Internal server error';
    }
    const errorResponse = response_1.ApiResponseBuilder.error(message, config_1.config.nodeEnv === 'development'
        ? `Error ID: ${errorId}. ${err.stack}`
        : `Error ID: ${errorId}. Please contact support if the issue persists.`);
    res.status(statusCode).json(errorResponse);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map