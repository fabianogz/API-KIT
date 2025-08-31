import { Request, Response, NextFunction } from 'express';
import { apiKeyAuth } from './auth';

const ROTAS_PUBLICAS = [
  '/',
  '/favicon.ico'
];

export const authCondicional = (req: Request, res: Response, next: NextFunction): void => {
  if (ROTAS_PUBLICAS.includes(req.path)) {
    return next();
  }
  
  return apiKeyAuth(req, res, next);
};
