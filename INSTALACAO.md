# 🚀 Guia de Instalação e Uso - API Kit

## 📦 Pré-requisitos

- **Node.js** 16+ (recomendado 18+)
- **npm** ou **yarn**
- **Git** (para clonar o repositório)

## 🛠️ Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/api-kit.git
cd api-kit
```

### 2. Instalar Dependências

```bash
# Com npm
npm install

# Ou com yarn
yarn install
```

### 3. Configurar Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar configurações (obrigatório)
# Use seu editor preferido: nano, vim, code, etc.
code .env
```

**Configurações importantes no .env:**
```env
# Altere esta chave para algo único e seguro
DEFAULT_API_KEY=sua-chave-super-secreta-aqui

# Ajuste conforme necessário
PORT=3000
LOG_LEVEL=info
```

## 🚀 Executando a Aplicação

### Modo Desenvolvimento

```bash
npm run dev
```
- ✅ Hot reload automático
- ✅ Logs detalhados
- ✅ TypeScript compilado em tempo real

### Modo Produção

```bash
# Compilar TypeScript
npm run build

# Iniciar servidor
npm start
```

## 🧪 Testando a API

### 1. Verificar se está funcionando

```bash
# Endpoint público (não precisa de API key)
curl http://localhost:3000/

# Deve retornar informações da API
```

### 2. Testar autenticação

```bash
# Com chave de API válida
curl -H "X-API-Key: sua-chave-super-secreta-aqui" \
     http://localhost:3000/api/v1/health

# Ou com Bearer Token
curl -H "Authorization: Bearer sua-chave-super-secreta-aqui" \
     http://localhost:3000/api/v1/health
```

### 3. Testar sem autenticação (deve falhar)

```bash
curl http://localhost:3000/api/v1/health

# Deve retornar erro 401
```

## 🛠️ Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Compila TypeScript para JavaScript |
| `npm start` | Inicia servidor de produção |
| `npm test` | Executa testes |
| `npm run test:watch` | Executa testes em modo watch |
| `npm run test:coverage` | Executa testes com relatório de cobertura |
| `npm run lint` | Verifica qualidade do código |
| `npm run lint:fix` | Corrige problemas de linting automaticamente |
| `npm run typecheck` | Verifica tipos TypeScript |
| `npm run validate` | Executa typecheck + lint + testes |

## 📁 Estrutura de Pastas

```
api-kit/
├── src/                    # Código fonte
│   ├── __tests__/         # Testes automatizados
│   ├── config/            # Configurações da aplicação
│   ├── controllers/       # Lógica dos endpoints
│   ├── middleware/        # Middlewares personalizados
│   ├── routes/            # Definição das rotas
│   ├── services/          # Regras de negócio
│   ├── types/             # Tipos TypeScript
│   ├── utils/             # Funções utilitárias
│   ├── app.ts             # Configuração do Express
│   └── server.ts          # Ponto de entrada
├── dist/                  # Código compilado (gerado automaticamente)
├── logs/                  # Arquivos de log (criado automaticamente)
├── .env                   # Configurações locais (você cria)
├── .env.example           # Exemplo de configurações
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração TypeScript
├── jest.config.json       # Configuração de testes
├── Dockerfile             # Para containerização
├── docker-compose.yml     # Orquestração de containers
├── README.md              # Documentação principal
├── EXAMPLES.md            # Exemplos de uso
├── BOAS_PRATICAS.md       # Guia de boas práticas
└── INSTALACAO.md          # Este arquivo
```

## 🐳 Executando com Docker

### Docker simples

```bash
# Build da imagem
docker build -t api-kit .

# Executar container
docker run -p 3000:3000 --env-file .env api-kit
```

### Docker Compose

```bash
# Iniciar todos os serviços
docker-compose up -d

# Parar serviços
docker-compose down

# Ver logs
docker-compose logs -f
```

## 🔧 Personalização

### 1. Adicionando novas rotas

```typescript
// 1. Criar controller em src/controllers/
// 2. Criar rotas em src/routes/
// 3. Registrar em src/routes/index.ts

// Exemplo rápido:
import { Router } from 'express';

const router = Router();

router.get('/nova-rota', (req, res) => {
  res.json({ mensagem: 'Nova rota funcionando!' });
});

export default router;
```

### 2. Configurando banco de dados

```bash
# Instalar driver do banco (exemplo MongoDB)
npm install mongoose
npm install @types/mongoose --save-dev

# Configurar conexão em src/config/database.ts
```

### 3. Desabilitando recursos

No arquivo `.env`:

```env
# Desabilitar autenticação (desenvolvimento)
API_KEY_ENABLED=false

# Desabilitar rate limiting
RATE_LIMIT_ENABLED=false

# Desabilitar CORS
CORS_ENABLED=false
```

## 🔍 Troubleshooting

### Problemas Comuns

**1. Erro de porta em uso:**
```bash
Error: listen EADDRINUSE :::3000
```
**Solução:** Altere a porta no `.env` ou pare o processo que está usando a porta 3000.

**2. Erro de módulos não encontrados:**
```bash
npm ERR! peer dep missing
```
**Solução:** Delete `node_modules` e `package-lock.json`, depois execute `npm install` novamente.

**3. Erro de TypeScript:**
```bash
TS2307: Cannot find module
```
**Solução:** Execute `npm run build` para verificar erros específicos.

### Logs e Debug

```bash
# Ver logs em tempo real (desenvolvimento)
npm run dev

# Ver logs de produção
tail -f logs/app.log

# Com PM2
pm2 logs api-kit
```

## 📊 Monitoramento

### Endpoints de Monitoramento

- `GET /` - Informações básicas da API
- `GET /api/v1/health` - Health check detalhado
- `GET /api/v1/status` - Status do serviço

### Métricas Importantes

- **Tempo de resposta** - Logged automaticamente
- **Rate limiting** - Headers incluídos nas respostas
- **Uso de memória** - Disponível no health check
- **Uptime** - Disponível no status

## 🆘 Suporte

### Recursos de Ajuda

1. **Documentação:** Leia `README.md` e `EXAMPLES.md`
2. **Boas Práticas:** Consulte `BOAS_PRATICAS.md`
3. **Logs:** Sempre verifique os logs primeiro
4. **Testes:** Execute `npm test` para validar

### Relatando Problemas

Ao reportar problemas, inclua:

- Versão do Node.js (`node --version`)
- Sistema operacional
- Logs relevantes
- Passos para reproduzir
- Configurações do `.env` (sem dados sensíveis)

---

**🎉 Pronto! Sua API está configurada e funcionando.**

Para próximos passos, consulte `EXAMPLES.md` para implementar recursos específicos ou `BOAS_PRATICAS.md` para otimizações avançadas.
