"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const healthService_1 = require("../services/healthService");
const response_1 = require("../utils/response");
const logger_1 = require("../utils/logger");
class HealthController {
    static async getHealth(req, res) {
        try {
            const healthData = await healthService_1.HealthService.getHealthStatus();
            res.json(response_1.ApiResponseBuilder.success(healthData, 'System health check completed'));
        }
        catch (error) {
            logger_1.logger.error('Health check failed', { error: error instanceof Error ? error.message : error });
            res.status(500).json(response_1.ApiResponseBuilder.error('Health check failed', 'Unable to retrieve system health'));
        }
    }
    static async getStatus(req, res) {
        try {
            const statusData = {
                status: 'active',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                pid: process.pid,
                nodeVersion: process.version,
                platform: process.platform,
                arch: process.arch
            };
            res.json(response_1.ApiResponseBuilder.success(statusData, 'Service status retrieved'));
        }
        catch (error) {
            logger_1.logger.error('Status check failed', { error: error instanceof Error ? error.message : error });
            res.status(500).json(response_1.ApiResponseBuilder.error('Status check failed', 'Unable to retrieve service status'));
        }
    }
}
exports.HealthController = HealthController;
//# sourceMappingURL=healthController.js.map