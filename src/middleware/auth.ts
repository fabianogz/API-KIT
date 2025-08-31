import { Request, Response, NextFunction } from 'express';
import { config } from '../config';
import { ApiResponseBuilder } from '../utils/response';
import { logger } from '../utils/logger';

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!config.apiKeyEnabled) {
    return next();
  }

  const apiKey = req.headers['x-api-key'] as string || 
                 req.headers['authorization']?.replace('Bearer ', '') as string;
  
  if (!apiKey) {
    logger.warn('API key missing in request', { 
      ip: req.ip, 
      path: req.path,
      userAgent: req.get('User-Agent')
    });
    
    res.status(401).json(
      ApiResponseBuilder.error('API key required', 'Missing X-API-Key header or Authorization Bearer token')
    );
    return;
  }

  if (apiKey !== config.defaultApiKey) {
    logger.warn('Invalid API key used', { 
      ip: req.ip, 
      path: req.path,
      providedKey: apiKey.substring(0, 8) + '...',
      userAgent: req.get('User-Agent')
    });
    
    res.status(401).json(
      ApiResponseBuilder.error('Invalid API key', 'The provided API key is not valid')
    );
    return;
  }

  logger.info('Valid API key used', { 
    ip: req.ip, 
    path: req.path,
    userAgent: req.get('User-Agent')
  });

  next();
};
