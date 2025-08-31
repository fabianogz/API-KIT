import { Request, Response } from 'express';
import { HealthService } from '../services/healthService';
import { ApiResponseBuilder } from '../utils/response';
import { logger } from '../utils/logger';

export class HealthController {
  static async getHealth(req: Request, res: Response): Promise<void> {
    try {
      const healthData = await HealthService.getHealthStatus();
      res.json(ApiResponseBuilder.success(healthData, 'System health check completed'));
    } catch (error) {
      logger.error('Health check failed', { error: error instanceof Error ? error.message : error });
      res.status(500).json(
        ApiResponseBuilder.error('Health check failed', 'Unable to retrieve system health')
      );
    }
  }

  static async getStatus(req: Request, res: Response): Promise<void> {
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
      
      res.json(ApiResponseBuilder.success(statusData, 'Service status retrieved'));
    } catch (error) {
      logger.error('Status check failed', { error: error instanceof Error ? error.message : error });
      res.status(500).json(
        ApiResponseBuilder.error('Status check failed', 'Unable to retrieve service status')
      );
    }
  }
}
