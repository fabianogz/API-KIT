import dotenv from 'dotenv';
import { Config } from '../types';

dotenv.config();

export const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  apiKeyEnabled: process.env.API_KEY_ENABLED === 'true',
  defaultApiKey: process.env.DEFAULT_API_KEY || 'default-api-key',
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  rateLimitEnabled: process.env.RATE_LIMIT_ENABLED === 'true',
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  },
  corsEnabled: process.env.CORS_ENABLED === 'true',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  logLevel: process.env.LOG_LEVEL || 'info',
  logFile: process.env.LOG_FILE || 'logs/app.log',
  compressionEnabled: process.env.COMPRESSION_ENABLED === 'true',
  helmetEnabled: process.env.HELMET_ENABLED === 'true',
};
