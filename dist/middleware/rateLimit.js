"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimit = void 0;
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const config_1 = require("../config");
const response_1 = require("../utils/response");
const logger_1 = require("../utils/logger");
const rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
    points: config_1.config.rateLimit.maxRequests,
    duration: Math.floor(config_1.config.rateLimit.windowMs / 1000),
    blockDuration: Math.floor(config_1.config.rateLimit.windowMs / 1000)
});
const rateLimit = async (req, res, next) => {
    if (!config_1.config.rateLimitEnabled) {
        return next();
    }
    const key = req.ip || req.socket.remoteAddress || 'unknown';
    try {
        await rateLimiter.consume(key);
        next();
    }
    catch (rejRes) {
        const remainingPoints = rejRes?.remainingPoints || 0;
        const msBeforeNext = rejRes?.msBeforeNext || 0;
        const totalHits = rejRes?.totalHits || 0;
        logger_1.logger.warn('Rate limit exceeded', {
            ip: req.ip,
            path: req.path,
            method: req.method,
            remainingPoints,
            totalHits,
            resetTime: new Date(Date.now() + msBeforeNext),
            userAgent: req.get('User-Agent')
        });
        res.set({
            'Retry-After': Math.round(msBeforeNext / 1000),
            'X-RateLimit-Limit': config_1.config.rateLimit.maxRequests,
            'X-RateLimit-Remaining': remainingPoints,
            'X-RateLimit-Reset': new Date(Date.now() + msBeforeNext).toISOString()
        });
        res.status(429).json(response_1.ApiResponseBuilder.error('Too many requests', `Rate limit exceeded. Try again in ${Math.round(msBeforeNext / 1000)} seconds.`));
    }
};
exports.rateLimit = rateLimit;
//# sourceMappingURL=rateLimit.js.map