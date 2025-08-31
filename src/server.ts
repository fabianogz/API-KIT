import app from './app';
import { config } from './config';
import { logger } from './utils/logger';
import { Server } from 'http';

let server: Server;

const startServer = (): void => {
  try {
    server = app.listen(config.port, () => {
      logger.info(`🚀 API Kit server is running`, {
        port: config.port,
        environment: config.nodeEnv,
        url: `http://localhost:${config.port}`,
        features: {
          apiKeyEnabled: config.apiKeyEnabled,
          rateLimitEnabled: config.rateLimitEnabled,
          corsEnabled: config.corsEnabled,
          compressionEnabled: config.compressionEnabled,
          helmetEnabled: config.helmetEnabled
        },
        endpoints: {
          root: '/',
          health: '/api/v1/health',
          status: '/api/v1/status'
        }
      });
    });

    server.on('error', (error: Error) => {
      logger.error('Server error', { error: error.message, stack: error.stack });
      process.exit(1);
    });

  } catch (error) {
    logger.error('Failed to start server', { 
      error: error instanceof Error ? error.message : error 
    });
    process.exit(1);
  }
};

const gracefulShutdown = (signal: string): void => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);
  
  if (server) {
    server.close(() => {
      logger.info('Server closed successfully');
      process.exit(0);
    });

    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception', { 
    error: error.message, 
    stack: error.stack 
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  logger.error('Unhandled Rejection', { 
    reason: reason instanceof Error ? reason.message : reason 
  });
  process.exit(1);
});

startServer();
