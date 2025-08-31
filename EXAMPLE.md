## 📖 Exemplos de Uso

### Uso Básico

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Iniciar servidor de produção
npm start
```

### Autenticação por Chave de API

```bash
# Requisição válida com chave de API
curl -H "X-API-Key: demo-api-key-12345" http://localhost:3000/api/v1/health

# Requisição com Bearer Token (alternativa)
curl -H "Authorization: Bearer demo-api-key-12345" http://localhost:3000/api/v1/health

# Requisição sem chave de API (falhará se API_KEY_ENABLED=true)
curl http://localhost:3000/api/v1/health
```

### Rate Limiting

A API inclui limitação de taxa integrada:
- Padrão: 100 requisições por 15 minutos por IP
- Configurável via variáveis de ambiente
- Retorna status 429 quando o limite é excedido
- Headers informativos incluídos na resposta

```bash
# Headers de resposta do rate limiting
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 2025-08-31T16:15:00.000Z
```

### Verificações de Saúde

```json
GET /api/v1/health
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2025-08-31T16:00:00.000Z",
    "uptime": 123.45,
    "memory": {
      "raw": {...},
      "formatted": {
        "rss": 165.28,
        "heapTotal": 123.45,
        "heapUsed": 119.12,
        "external": 5.38
      },
      "units": "MB"
    },
    "system": {
      "environment": "development",
      "nodeVersion": "v18.17.0",
      "platform": "win32",
      "arch": "x64",
      "pid": 12345
    },
    "api": {
      "version": "1.0.0",
      "name": "API Kit",
      "features": {
        "apiKeyEnabled": true,
        "rateLimitEnabled": true,
        "corsEnabled": true,
        "compressionEnabled": true,
        "helmetEnabled": true
      }
    },
    "responseTime": 15
  },
  "message": "System health check completed",
  "timestamp": "2025-08-31T16:00:00.000Z"
}
```

### Adicionando Rotas Personalizadas

1. Criar um novo controlador:

```typescript
// src/controllers/usuarioController.ts
import { Request, Response } from 'express';
import { ApiResponseBuilder } from '../utils/response';

export class UsuarioController {
  static async obterUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = []; // Sua lógica aqui
      res.json(ApiResponseBuilder.success(usuarios, 'Usuários obtidos com sucesso'));
    } catch (error) {
      res.status(500).json(
        ApiResponseBuilder.error('Erro ao obter usuários', 'Erro interno do servidor')
      );
    }
  }

  static async criarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const novoUsuario = req.body; // Sua lógica aqui
      res.status(201).json(
        ApiResponseBuilder.success(novoUsuario, 'Usuário criado com sucesso')
      );
    } catch (error) {
      res.status(500).json(
        ApiResponseBuilder.error('Erro ao criar usuário', 'Erro interno do servidor')
      );
    }
  }
}
```

2. Criar rotas:

```typescript
// src/routes/usuarios.ts
import { Router } from 'express';
import { UsuarioController } from '../controllers/usuarioController';
import { validate } from '../middleware/validation';
import Joi from 'joi';

const router = Router();

const esquemaUsuario = Joi.object({
  nome: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  idade: Joi.number().min(18).max(120).optional()
});

router.get('/', UsuarioController.obterUsuarios);
router.post('/', validate(esquemaUsuario), UsuarioController.criarUsuario);

export default router;
```

3. Registrar rotas:

```typescript
// src/routes/index.ts
import usuarioRoutes from './usuarios';

// Adicionar esta linha
router.use('/api/v1/usuarios', usuarioRoutes);
```

### Middleware Personalizado

```typescript
// src/middleware/autorização.ts
import { Request, Response, NextFunction } from 'express';
import { ApiResponseBuilder } from '../utils/response';

interface UsuarioRequest extends Request {
  usuario?: {
    id: string;
    permissoes: string[];
  };
}

export const verificarPermissao = (permissaoNecessaria: string) => {
  return (req: UsuarioRequest, res: Response, next: NextFunction): void => {
    const usuario = req.usuario;
    
    if (!usuario) {
      res.status(401).json(
        ApiResponseBuilder.error('Não autorizado', 'Usuário não autenticado')
      );
      return;
    }

    if (!usuario.permissoes.includes(permissaoNecessaria)) {
      res.status(403).json(
        ApiResponseBuilder.error('Acesso negado', 'Permissão insuficiente')
      );
      return;
    }

    next();
  };
};
```

### Validação Avançada

```typescript
// Esquemas de validação complexos
const esquemaUsuarioCompleto = Joi.object({
  dadosPessoais: Joi.object({
    nome: Joi.string().min(2).max(100).required(),
    sobrenome: Joi.string().min(2).max(100).required(),
    dataNascimento: Joi.date().max('now').required()
  }).required(),
  
  contato: Joi.object({
    email: Joi.string().email().required(),
    telefone: Joi.string().pattern(/^[0-9+\-\s()]+$/).optional(),
    endereco: Joi.object({
      rua: Joi.string().required(),
      cidade: Joi.string().required(),
      cep: Joi.string().pattern(/^[0-9]{5}-?[0-9]{3}$/).required()
    }).optional()
  }).required(),
  
  preferencias: Joi.object({
    idioma: Joi.string().valid('pt', 'en', 'es').default('pt'),
    receberNotificacoes: Joi.boolean().default(true)
  }).optional()
});
```

### Logging Personalizado

```typescript
// src/utils/logger.ts - Uso personalizado
import { logger } from '../utils/logger';

// Em seus controladores
export class MeuController {
  static async minhaFuncao(req: Request, res: Response): Promise<void> {
    const inicioTempo = Date.now();
    
    logger.info('Iniciando processamento', {
      usuario: req.ip,
      operacao: 'minhaFuncao',
      parametros: req.params
    });

    try {
      // Sua lógica aqui
      const resultado = await processarAlgo();
      
      logger.info('Processamento concluído', {
        duracao: Date.now() - inicioTempo,
        sucesso: true
      });
      
      res.json(ApiResponseBuilder.success(resultado));
    } catch (error) {
      logger.error('Erro no processamento', {
        erro: error.message,
        duracao: Date.now() - inicioTempo,
        stack: error.stack
      });
      
      res.status(500).json(
        ApiResponseBuilder.error('Erro interno', 'Falha no processamento')
      );
    }
  }
}
```

### Configuração de Ambiente por Contexto

```bash
# .env.development
NODE_ENV=development
LOG_LEVEL=debug
API_KEY_ENABLED=false
RATE_LIMIT_ENABLED=false

# .env.staging
NODE_ENV=staging
LOG_LEVEL=info
API_KEY_ENABLED=true
RATE_LIMIT_ENABLED=true
RATE_LIMIT_MAX_REQUESTS=200

# .env.production
NODE_ENV=production
LOG_LEVEL=warn
API_KEY_ENABLED=true
RATE_LIMIT_ENABLED=true
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=https://meusite.com,https://app.meusite.com
```

### Testes Automatizados

```typescript
// src/__tests__/usuario.test.ts
import request from 'supertest';
import app from '../app';

describe('Controller de Usuários', () => {
  describe('POST /api/v1/usuarios', () => {
    it('deve criar um usuário com dados válidos', async () => {
      const dadosUsuario = {
        nome: 'João Silva',
        email: 'joao@exemplo.com'
      };

      const resposta = await request(app)
        .post('/api/v1/usuarios')
        .set('X-API-Key', 'demo-api-key-12345')
        .send(dadosUsuario);

      expect(resposta.status).toBe(201);
      expect(resposta.body.success).toBe(true);
      expect(resposta.body.data).toHaveProperty('nome', 'João Silva');
    });

    it('deve rejeitar dados inválidos', async () => {
      const dadosInvalidos = {
        nome: 'A', // Muito curto
        email: 'email-inválido'
      };

      const resposta = await request(app)
        .post('/api/v1/usuarios')
        .set('X-API-Key', 'demo-api-key-12345')
        .send(dadosInvalidos);

      expect(resposta.status).toBe(400);
      expect(resposta.body.success).toBe(false);
      expect(resposta.body.error).toContain('Validation failed');
    });
  });
});
```

### Deploy e Monitoramento

```bash
# Usando PM2 para produção
npm install -g pm2

# Configurar aplicação
pm2 start dist/server.js --name "api-kit" --instances max

# Monitorar aplicação
pm2 monit

# Visualizar logs
pm2 logs api-kit

# Reiniciar aplicação
pm2 restart api-kit
```

### Integração com Banco de Dados

```typescript
// Exemplo com MongoDB/Mongoose
import mongoose from 'mongoose';

const esquemaUsuario = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  criadoEm: { type: Date, default: Date.now }
});

export const Usuario = mongoose.model('Usuario', esquemaUsuario);

// No controller
export class UsuarioController {
  static async criarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const novoUsuario = new Usuario(req.body);
      await novoUsuario.save();
      
      res.status(201).json(
        ApiResponseBuilder.success(novoUsuario, 'Usuário criado com sucesso')
      );
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json(
          ApiResponseBuilder.error('Email já existe', 'Este email já está em uso')
        );
      } else {
        res.status(500).json(
          ApiResponseBuilder.error('Erro ao criar usuário', 'Erro interno do servidor')
        );
      }
    }
  }
}
```
