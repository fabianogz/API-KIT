"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyAuth = void 0;
const config_1 = require("../config");
const response_1 = require("../utils/response");
const logger_1 = require("../utils/logger");
const apiKeyAuth = (req, res, next) => {
    if (!config_1.config.apiKeyEnabled) {
        return next();
    }
    const apiKey = req.headers['x-api-key'] ||
        req.headers['authorization']?.replace('Bearer ', '');
    if (!apiKey) {
        logger_1.logger.warn('API key missing in request', {
            ip: req.ip,
            path: req.path,
            userAgent: req.get('User-Agent')
        });
        res.status(401).json(response_1.ApiResponseBuilder.error('API key required', 'Missing X-API-Key header or Authorization Bearer token'));
        return;
    }
    if (apiKey !== config_1.config.defaultApiKey) {
        logger_1.logger.warn('Invalid API key used', {
            ip: req.ip,
            path: req.path,
            providedKey: apiKey.substring(0, 8) + '...',
            userAgent: req.get('User-Agent')
        });
        res.status(401).json(response_1.ApiResponseBuilder.error('Invalid API key', 'The provided API key is not valid'));
        return;
    }
    logger_1.logger.info('Valid API key used', {
        ip: req.ip,
        path: req.path,
        userAgent: req.get('User-Agent')
    });
    next();
};
exports.apiKeyAuth = apiKeyAuth;
//# sourceMappingURL=auth.js.map