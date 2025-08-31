"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const logger_1 = require("./utils/logger");
let server;
const startServer = () => {
    try {
        server = app_1.default.listen(config_1.config.port, () => {
            logger_1.logger.info(`🚀 API Kit server is running`, {
                port: config_1.config.port,
                environment: config_1.config.nodeEnv,
                url: `http://localhost:${config_1.config.port}`,
                features: {
                    apiKeyEnabled: config_1.config.apiKeyEnabled,
                    rateLimitEnabled: config_1.config.rateLimitEnabled,
                    corsEnabled: config_1.config.corsEnabled,
                    compressionEnabled: config_1.config.compressionEnabled,
                    helmetEnabled: config_1.config.helmetEnabled
                },
                endpoints: {
                    root: '/',
                    health: '/api/v1/health',
                    status: '/api/v1/status'
                }
            });
        });
        server.on('error', (error) => {
            logger_1.logger.error('Server error', { error: error.message, stack: error.stack });
            process.exit(1);
        });
    }
    catch (error) {
        logger_1.logger.error('Failed to start server', {
            error: error instanceof Error ? error.message : error
        });
        process.exit(1);
    }
};
const gracefulShutdown = (signal) => {
    logger_1.logger.info(`Received ${signal}. Starting graceful shutdown...`);
    if (server) {
        server.close(() => {
            logger_1.logger.info('Server closed successfully');
            process.exit(0);
        });
        setTimeout(() => {
            logger_1.logger.error('Forced shutdown after timeout');
            process.exit(1);
        }, 10000);
    }
    else {
        process.exit(0);
    }
};
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', (error) => {
    logger_1.logger.error('Uncaught Exception', {
        error: error.message,
        stack: error.stack
    });
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    logger_1.logger.error('Unhandled Rejection', {
        reason: reason instanceof Error ? reason.message : reason
    });
    process.exit(1);
});
startServer();
//# sourceMappingURL=server.js.map