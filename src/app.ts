import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from './config';
import { logger } from './utils/logger';
import { authCondicional } from './middleware/authCondicional';
import { rateLimit } from './middleware/rateLimit';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { ApiResponseBuilder } from './utils/response';
import routes from './routes';

const app = express();

app.set('trust proxy', 1);

if (config.helmetEnabled) {
  app.use(helmet({
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

if (config.compressionEnabled) {
  app.use(compression({
    filter: (req: Request, res: Response) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
    level: 6,
    threshold: 1024
  }));
}

if (config.corsEnabled) {
  app.use(cors({
    origin: config.corsOrigin === '*' ? true : config.corsOrigin.split(',').map(origin => origin.trim()),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
    exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset']
  }));
}

app.use(express.json({ 
  limit: '10mb',
  type: ['application/json', 'text/plain']
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb'
}));

app.use(requestLogger);
app.use(rateLimit);
app.use(authCondicional);

app.use('/', routes);

app.all('*', (req: Request, res: Response) => {
  res.status(404).json(
    ApiResponseBuilder.error(
      'Route not found',
      `The requested endpoint ${req.method} ${req.path} does not exist`
    )
  );
});

app.use(errorHandler);

export default app;
