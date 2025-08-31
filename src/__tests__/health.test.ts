import request from 'supertest';
import app from '../app';

describe('Health Controller', () => {
  describe('GET /api/v1/health', () => {
    it('should return health status with valid API key', async () => {
      const response = await request(app)
        .get('/api/v1/health')
        .set('X-API-Key', 'demo-api-key-12345');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('status', 'healthy');
      expect(response.body.data).toHaveProperty('uptime');
      expect(response.body.data).toHaveProperty('memory');
    });

    it('should return 401 when API key is missing', async () => {
      const response = await request(app)
        .get('/api/v1/health');

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('API key required');
    });
  });

  describe('GET /api/v1/status', () => {
    it('should return status information', async () => {
      const response = await request(app)
        .get('/api/v1/status')
        .set('X-API-Key', 'demo-api-key-12345');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('status', 'active');
      expect(response.body.data).toHaveProperty('uptime');
    });
  });
});
