"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
const config_1 = require("../config");
class HealthService {
    static async getHealthStatus() {
        const startTime = Date.now();
        const memory = process.memoryUsage();
        const memoryUsagePercent = {
            rss: Math.round((memory.rss / 1024 / 1024) * 100) / 100,
            heapTotal: Math.round((memory.heapTotal / 1024 / 1024) * 100) / 100,
            heapUsed: Math.round((memory.heapUsed / 1024 / 1024) * 100) / 100,
            external: Math.round((memory.external / 1024 / 1024) * 100) / 100
        };
        const healthData = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: Math.round(process.uptime() * 100) / 100,
            memory: {
                raw: memory,
                formatted: memoryUsagePercent,
                units: 'MB'
            },
            system: {
                environment: config_1.config.nodeEnv,
                nodeVersion: process.version,
                platform: process.platform,
                arch: process.arch,
                pid: process.pid
            },
            api: {
                version: '1.0.0',
                name: 'API Kit',
                features: {
                    apiKeyEnabled: config_1.config.apiKeyEnabled,
                    rateLimitEnabled: config_1.config.rateLimitEnabled,
                    corsEnabled: config_1.config.corsEnabled,
                    compressionEnabled: config_1.config.compressionEnabled,
                    helmetEnabled: config_1.config.helmetEnabled
                }
            },
            responseTime: Date.now() - startTime
        };
        return healthData;
    }
    static async checkDatabase() {
        const startTime = Date.now();
        await new Promise(resolve => setTimeout(resolve, Math.random() * 10));
        return {
            connected: true,
            responseTime: `${Date.now() - startTime}ms`
        };
    }
    static async checkExternalServices() {
        return {
            available: true,
            services: []
        };
    }
}
exports.HealthService = HealthService;
//# sourceMappingURL=healthService.js.map