import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { config } from '../config';
import { ApiResponseBuilder } from '../utils/response';
import { logger } from '../utils/logger';

const rateLimiter = new RateLimiterMemory({
  points: config.rateLimit.maxRequests,
  duration: Math.floor(config.rateLimit.windowMs / 1000),
  blockDuration: Math.floor(config.rateLimit.windowMs / 1000)
});

export const rateLimit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!config.rateLimitEnabled) {
    return next();
  }

  const key = req.ip || req.socket.remoteAddress || 'unknown';

  try {
    await rateLimiter.consume(key);
    next();
  } catch (rejRes: any) {
    const remainingPoints = rejRes?.remainingPoints || 0;
    const msBeforeNext = rejRes?.msBeforeNext || 0;
    const totalHits = rejRes?.totalHits || 0;

    logger.warn('Rate limit exceeded', {
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
      'X-RateLimit-Limit': config.rateLimit.maxRequests,
      'X-RateLimit-Remaining': remainingPoints,
      'X-RateLimit-Reset': new Date(Date.now() + msBeforeNext).toISOString()
    });

    res.status(429).json(
      ApiResponseBuilder.error(
        'Too many requests',
        `Rate limit exceeded. Try again in ${Math.round(msBeforeNext / 1000)} seconds.`
      )
    );
  }
};
