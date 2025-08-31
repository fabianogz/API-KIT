# API Kit

Base dinâmica para criação de APIs modernas, com autenticação opcional, modularidade e foco em performance.

## 🚀 Recursos

* **TypeScript** - Tipagem completa e segurança de tipos
* **Autenticação Flexível** - API Key ou Bearer Token configurável
* **Rate Limiting Avançado** - Proteção contra abuso com headers informativos
* **Segurança Robusta** - Helmet.js com CSP personalizada e CORS flexível
* **Validação de Dados** - Middleware Joi para validação de entrada
* **Logging Profissional** - Winston com rotação e logs estruturados
* **Compressão Inteligente** - Otimização automática de performance
* **Health Checks Detalhados** - Monitoramento completo do sistema
* **Tratamento de Erros Avançado** - Erros com IDs únicos para rastreamento
* **Arquitetura Modular** - Estrutura escalável e organizada
* **Encerramento Elegante** - Shutdown gracioso do servidor
* **Request Logging** - Log detalhado de todas as requisições
* **Testes Incluídos** - Estrutura completa com Jest e Supertest

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

| Variável                  | Descrição                          | Padrão               |
| ------------------------- | ---------------------------------- | -------------------- |
| `PORT`                    | Porta do servidor                  | `3000`               |
| `NODE_ENV`                | Ambiente de execução               | `development`        |
| `API_KEY_ENABLED`         | Habilitar autenticação por API key | `true`               |
| `DEFAULT_API_KEY`         | Chave de API padrão                | `demo-api-key-12345` |
| `RATE_LIMIT_ENABLED`      | Habilitar limitação de taxa        | `true`               |
| `RATE_LIMIT_WINDOW_MS`    | Janela de tempo para rate limit    | `900000` (15 min)    |
| `RATE_LIMIT_MAX_REQUESTS` | Máximo de requisições por janela   | `100`                |
| `CORS_ENABLED`            | Habilitar CORS                     | `true`               |
| `CORS_ORIGIN`             | Origens permitidas para CORS       | `*`                  |
| `LOG_LEVEL`               | Nível de logging                   | `info`               |
| `COMPRESSION_ENABLED`     | Habilitar compressão               | `true`               |
| `HELMET_ENABLED`          | Habilitar headers de segurança     | `true`               |

## 📚 Endpoints da API

### Informações e Status

* `GET /` - Informações da API
* `GET /api/v1/health` - Verificação de saúde detalhada
* `GET /api/v1/status` - Informações de status do serviço

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

* `npm run dev` - Iniciar servidor de desenvolvimento com hot reload
* `npm run build` - Compilar para produção
* `npm start` - Iniciar servidor de produção
* `npm test` - Executar testes
* `npm run test:watch` - Executar testes em modo watch
* `npm run test:coverage` - Executar testes com relatório de cobertura
* `npm run lint` - Executar linter
* `npm run lint:fix` - Corrigir problemas de linting
* `npm run typecheck` - Verificar tipos TypeScript
* `npm run validate` - Executar todas as validações

### Adicionando Novas Rotas

1. Criar controlador em `src/controllers/`
2. Definir rotas em `src/routes/`
3. Registrar rota em `src/routes/index.ts`

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

1. Defina `NODE_ENV=production`
2. Configure as variáveis de ambiente apropriadas
3. Use um gerenciador de processos como **PM2**
4. Configure proxy reverso (**nginx**)
5. Configure certificados **SSL/TLS**

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

Licença **MIT** – veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuindo

1. Faça um **fork** do repositório
2. Crie uma **branch** para sua feature
3. Faça suas alterações
4. Adicione testes
5. Envie um **pull request**

## POR FG DEVs
