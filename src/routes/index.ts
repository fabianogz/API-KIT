import { Router } from 'express';
import healthRoutes from './health';

const router = Router();

router.use('/api/v1', healthRoutes);

router.get('/', (req, res) => {
  res.json({
    name: 'API Kit',
    version: '1.0.0',
    description: 'Base dinâmica para criação de APIs modernas, com autenticação opcional, modularidade e foco em performance.',
    endpoints: {
      health: '/api/v1/health',
      status: '/api/v1/status'
    },
    documentation: {
      readme: 'README.md',
      examples: 'EXAMPLES.md',
      bestPractices: 'BOAS_PRATICAS.md'
    }
  });
});

export default router;
