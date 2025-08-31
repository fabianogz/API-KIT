# API Kit

Base dinâmica para criação de APIs modernas, com autenticação opcional, modularidade e foco em performance.

## 🚀 Recursos

- **TypeScript** - Tipagem completa e segurança de tipos
- **Autenticação Flexível** - API Key ou Bearer Token configurável
- **Rate Limiting Avançado** - Proteção contra abuso com headers informativos
- **Segurança Robusta** - Helmet.js com CSP personalizada e CORS flexível
- **Validação de Dados** - Middleware Joi para validação de entrada
- **Logging Profissional** - Winston com rotação e logs estruturados
- **Compressão Inteligente** - Otimização automática de performance
- **Health Checks Detalhados** - Monitoramento completo do sistema
- **Error Handling Avançado** - Tratamento de erros com IDs únicos
- **Arquitetura Modular** - Estrutura escalável e organizada
- **Graceful Shutdown** - Encerramento elegante do servidor
- **Request Logging** - Log detalhado de todas as requisições
- **Testes Incluídos** - Estrutura completa com Jest e Supertest

## ⚡ Início Rápido

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd api-kit

# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env
```
Edite o arquivo `.env` com suas configurações.

```bash
# Servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

## 🔧 Configuração do Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| `PORT` | Porta do servidor | `3000` |
| `NODE_ENV` | Ambiente de execução | `development` |
| `API_KEY_ENABLED` | Habilitar autenticação por API key | `true` |
| `DEFAULT_API_KEY` | Chave de API padrão | `demo-api-key-12345` |
| `RATE_LIMIT_ENABLED` | Habilitar limitação de taxa | `true` |
| `RATE_LIMIT_WINDOW_MS` | Janela de tempo para rate limit | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Máximo de requisições por janela | `100` |
| `CORS_ENABLED` | Habilitar CORS | `true` |
| `CORS_ORIGIN` | Origens permitidas para CORS | `*` |
| `LOG_LEVEL` | Nível de logging | `info` |
| `COMPRESSION_ENABLED` | Habilitar compressão | `true` |
| `HELMET_ENABLED` | Habilitar headers de segurança | `true` |

## 📚 Endpoints da API

### Informações e Status
- `GET /` - Informações da API
- `GET /api/v1/health` - Verificação de saúde detalhada
- `GET /api/v1/status` - Informações de status do serviço

## 🏗️ Estrutura do Projeto

```
src/
├── __tests__/        # Testes automatizados
├── config/           # Arquivos de configuração
├── controllers/      # Controladores das rotas
├── middleware/       # Middlewares personalizados
├── routes/           # Definições de rotas
├── services/         # Lógica de negócio
├── types/            # Definições de tipos TypeScript
├── utils/            # Funções utilitárias
├── app.ts            # Configuração da aplicação Express
└── server.ts         # Ponto de entrada do servidor
```

## 💻 Desenvolvimento

### Scripts Disponíveis

- `npm run dev` - Iniciar servidor de desenvolvimento com hot reload
- `npm run build` - Compilar para produção
- `npm start` - Iniciar servidor de produção
- `npm test` - Executar testes
- `npm run test:watch` - Executar testes em modo watch
- `npm run test:coverage` - Executar testes com cobertura
- `npm run lint` - Executar linter
- `npm run lint:fix` - Corrigir problemas de linting
- `npm run typecheck` - Verificar tipos TypeScript
- `npm run validate` - Executar todas as validações

### Adicionando Novas Rotas

1. Criar controlador em `src/controllers/`
2. Definir rotas em `src/routes/`
3. Adicionar rota em `src/routes/index.ts`

### Adicionando Middleware

1. Criar middleware em `src/middleware/`
2. Aplicar em `src/app.ts` ou em rotas específicas

## ⚙️ Personalização

### Desabilitar Recursos

A maioria dos recursos pode ser desabilitada via variáveis de ambiente:

```env
API_KEY_ENABLED=false
RATE_LIMIT_ENABLED=false
CORS_ENABLED=false
COMPRESSION_ENABLED=false
HELMET_ENABLED=false
```

### Validação Personalizada

Adicione esquemas Joi para validação de requisições:

```typescript
import Joi from 'joi';
import { validate } from '../middleware/validation';

const esquemaUsuario = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required()
});

router.post('/usuarios', validate(esquemaUsuario), UsuarioController.criar);
```

## 🐳 Deploy com Docker

```bash
# Build da imagem
docker build -t api-kit .

# Executar container
docker run -p 3000:3000 api-kit

# Ou usar docker-compose
docker-compose up -d
```

## 🚀 Deploy em Produção

1. Definir `NODE_ENV=production`
2. Configurar variáveis de ambiente apropriadas
3. Usar um gerenciador de processos como PM2
4. Configurar proxy reverso (nginx)
5. Configurar certificados SSL/TLS

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Testes com cobertura
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

## 📝 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🤝 Contribuindo

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Faça suas alterações
4. Adicione testes
5. Envie um pull request

## 📖 Exemplos Adicionais

Consulte o arquivo `EXAMPLES.md` para exemplos práticos de uso e implementação de recursos avançados.

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` |
| `API_KEY_ENABLED` | Enable API key auth | `true` |
| `DEFAULT_API_KEY` | Default API key | `your-default-api-key-here` |
| `RATE_LIMIT_ENABLED` | Enable rate limiting | `true` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |
| `CORS_ENABLED` | Enable CORS | `true` |
| `CORS_ORIGIN` | CORS origins | `*` |
| `LOG_LEVEL` | Logging level | `info` |
| `COMPRESSION_ENABLED` | Enable compression | `true` |
| `HELMET_ENABLED` | Enable security headers | `true` |

## API Endpoints

### Health & Status
- `GET /` - API information
- `GET /api/v1/health` - Health check
- `GET /api/v1/status` - Status information

## Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── middleware/       # Custom middleware
├── routes/          # Route definitions
├── services/        # Business logic
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── app.ts           # Express app configuration
└── server.ts        # Server entry point
```

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run linter
- `npm run lint:fix` - Fix linting issues

### Adding New Routes

1. Create controller in `src/controllers/`
2. Define routes in `src/routes/`
3. Add route to `src/routes/index.ts`

### Adding Middleware

1. Create middleware in `src/middleware/`
2. Apply in `src/app.ts` or specific routes

## Customization

### Disable Features

Most features can be disabled via environment variables:

```env
API_KEY_ENABLED=false
RATE_LIMIT_ENABLED=false
CORS_ENABLED=false
COMPRESSION_ENABLED=false
HELMET_ENABLED=false
```

### Custom Validation

Add Joi schemas for request validation:

```typescript
import Joi from 'joi';
import { validate } from '../middleware/validation';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required()
});

router.post('/users', validate(userSchema), UserController.create);
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Configure proper environment variables
3. Use a process manager like PM2
4. Set up reverse proxy (nginx)
5. Configure SSL/TLS certificates

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## BY FG