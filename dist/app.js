"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const config_1 = require("./config");
const authCondicional_1 = require("./middleware/authCondicional");
const rateLimit_1 = require("./middleware/rateLimit");
const errorHandler_1 = require("./middleware/errorHandler");
const requestLogger_1 = require("./middleware/requestLogger");
const response_1 = require("./utils/response");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.set('trust proxy', 1);
if (config_1.config.helmetEnabled) {
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https:"],
            },
        },
    }));
}
if (config_1.config.compressionEnabled) {
    app.use((0, compression_1.default)({
        filter: (req, res) => {
            if (req.headers['x-no-compression']) {
                return false;
            }
            return compression_1.default.filter(req, res);
        },
        level: 6,
        threshold: 1024
    }));
}
if (config_1.config.corsEnabled) {
    app.use((0, cors_1.default)({
        origin: config_1.config.corsOrigin === '*' ? true : config_1.config.corsOrigin.split(',').map(origin => origin.trim()),
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
        exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset']
    }));
}
app.use(express_1.default.json({
    limit: '10mb',
    type: ['application/json', 'text/plain']
}));
app.use(express_1.default.urlencoded({
    extended: true,
    limit: '10mb'
}));
app.use(requestLogger_1.requestLogger);
app.use(rateLimit_1.rateLimit);
app.use(authCondicional_1.authCondicional);
app.use('/', routes_1.default);
app.all('*', (req, res) => {
    res.status(404).json(response_1.ApiResponseBuilder.error('Route not found', `The requested endpoint ${req.method} ${req.path} does not exist`));
});
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map