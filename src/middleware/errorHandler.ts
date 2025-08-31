import { Request, Response, NextFunction } from 'express';
import { ApiResponseBuilder } from '../utils/response';
import { logger } from '../utils/logger';
import { config } from '../config';

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errorId = Date.now().toString(36) + Math.random().toString(36).substr(2);
  
  logger.error('Unhandled error', {
    errorId,
    error: err.message,
    stack: config.nodeEnv === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    body: req.body,
    query: req.query,
    params: req.params,
    code: err.code,
    details: err.details
  });

  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  let message = 'Internal server error';
  
  if (statusCode < 500) {
    message = err.message || 'Bad request';
  } else if (config.nodeEnv === 'development') {
    message = err.message || 'Internal server error';
  }

  const errorResponse = ApiResponseBuilder.error(
    message,
    config.nodeEnv === 'development' 
      ? `Error ID: ${errorId}. ${err.stack}` 
      : `Error ID: ${errorId}. Please contact support if the issue persists.`
  );

  res.status(statusCode).json(errorResponse);
};
