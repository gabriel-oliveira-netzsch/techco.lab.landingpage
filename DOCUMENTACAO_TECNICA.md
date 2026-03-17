# Documentação Técnica — Techco.lab Landing Page

Documento técnico completo da landing page institucional do **Techco.lab**, hub de inovação digital do grupo NETZSCH.

---

## 1. Visão Geral


| Aspecto       | Descrição                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------ |
| **Projeto**   | ntechcolab-site                                                                            |
| **Versão**    | 0.1.0                                                                                      |
| **Produção**  | [https://ntechcolab.com](https://ntechcolab.com)                                           |
| **Propósito** | Site institucional com vagas, cultura, projetos e talent pool integrado ao SmartRecruiters |


---

## 2. Stack Tecnológica


| Tecnologia       | Versão    | Uso                                |
| ---------------- | --------- | ---------------------------------- |
| **Next.js**      | 16.0.8    | Framework React com App Router     |
| **React**        | 19.2.1    | Biblioteca de UI                   |
| **TypeScript**   | ^5        | Tipagem estática                   |
| **Tailwind CSS** | ^4        | Estilização utility-first          |
| **Radix UI**     | -         | Componentes acessíveis (shadcn/ui) |
| **next-intl**    | ^4.5.8    | Internacionalização (i18n)         |
| **Motion**       | ^12.23.26 | Animações                          |
| **Lucide React** | ^0.560.0  | Ícones                             |


---

## 3. Estrutura do Projeto

```
ntechcolab-site/
├── app/                          # App Router (Next.js)
│   ├── [locale]/                 # Rotas internacionalizadas (en, pt-BR)
│   │   ├── page.tsx              # Home
│   │   ├── layout.tsx            # Layout por locale
│   │   ├── open-positions/       # Página de vagas
│   │   ├── our-culture/          # Cultura
│   │   ├── what-we-do/           # Projetos
│   │   ├── positions/[id]/       # Detalhes de vaga (metadados dinâmicos)
│   │   ├── imprint/              # Aviso legal (EN) — noindex
│   │   ├── aviso-legal/          # Aviso legal (PT) — noindex
│   │   ├── privacy-policy/       # Política de privacidade
│   │   ├── search/              # Busca (vagas + páginas)
│   │   └── not-found.tsx
│   ├── api/                      # API Routes (BFF)
│   │   ├── jobs/
│   │   │   ├── route.ts          # GET /api/jobs
│   │   │   └── [id]/
│   │   │       ├── route.ts      # GET /api/jobs/:id
│   │   │       └── publication/
│   │   │           └── route.ts  # GET /api/jobs/:id/publication
│   │   ├── candidates/
│   │   │   └── route.ts          # POST /api/candidates
│   │   └── search/
│   │       └── route.ts          # GET /api/search?q=&locale=
│   ├── layout.tsx                # Layout raiz
│   ├── globals.css
│   ├── robots.ts                 # robots.txt dinâmico
│   └── sitemap.ts                # sitemap.xml dinâmico (inclui vagas)
├── components/
│   ├── sections/                 # Seções de páginas
│   ├── jobs/                     # Componentes de vagas
│   ├── ui/                       # Componentes base (shadcn)
│   ├── icons/                    # Ícones SVG
│   ├── analytics/                # Tracking e analytics
│   ├── Cookiebot.tsx
│   ├── GoogleAnalytics.tsx
│   ├── Header.tsx
│   ├── GlobalFooter.tsx
│   └── ...
├── lib/
│   ├── analytics.ts              # Utilitários GA4
│   ├── smartrecruiters.ts        # Fetch de vagas (sitemap)
│   ├── schema.ts                 # JSON-LD Organization + WebSite (Knowledge Panel)
│   ├── searchIndex.ts            # Índice de páginas para busca
│   ├── searchValidation.ts       # Validação e sanitização de URLs/busca
│   ├── utils.ts
│   └── images.ts
├── messages/
│   ├── en.json                   # Traduções inglês
│   └── pt.json                   # Traduções português
├── i18n/
│   ├── config.ts                 # Locales e configuração
│   └── request.ts                # Configuração next-intl
├── hooks/
│   ├── useTimeOnPage.ts
│   └── useSectionTracking.ts
├── public/
│   └── llms.txt                 # Descoberta por IAs (llmstxt.org)
├── middleware.ts                 # i18n + redirect www
├── next.config.ts
├── Dockerfile
└── .github/workflows/deploy.yml
```

---

## 4. Integração com SmartRecruiters

### 4.1 Visão Geral

A aplicação utiliza a **API REST do SmartRecruiters** como backend de recrutamento. A comunicação é feita via **OAuth 2.0 Client Credentials** e todas as chamadas passam pelas **API Routes** do Next.js (padrão BFF).

### 4.2 Autenticação OAuth 2.0

**Endpoint de token:**

```
POST https://api.smartrecruiters.com/identity/oauth/token
Content-Type: application/x-www-form-urlencoded

client_id={SMARTRECRUITERS_CLIENT_ID}
client_secret={SMARTRECRUITERS_CLIENT_SECRET}
grant_type=client_credentials
```

**Variáveis de ambiente:**

- `SMARTRECRUITERS_CLIENT_ID` — ID do cliente OAuth
- `SMARTRECRUITERS_CLIENT_SECRET` — Segredo do cliente OAuth

**Cache de token:** O token é armazenado em memória em cada rota de API, com renovação automática 60 segundos antes do vencimento.

### 4.3 Endpoints Utilizados


| Endpoint SmartRecruiters                 | Método | Uso                                     |
| ---------------------------------------- | ------ | --------------------------------------- |
| `/identity/oauth/token`                  | POST   | Obter access token                      |
| `/jobs`                                  | GET    | Listar vagas (com filtros)              |
| `/jobs/{id}`                             | GET    | Detalhes de uma vaga                    |
| `/jobs/{id}/publication?activeOnly=true` | GET    | Publicação ativa (postingId para Apply) |
| `/candidates`                            | POST   | Criar candidato (talent pool)           |
| `/candidates/{id}/attachments`           | POST   | Upload de CV                            |


### 4.4 Fluxo de Dados

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│   Cliente   │────▶│  API Routes      │────▶│  SmartRecruiters API │
│   (React)   │     │  (Next.js BFF)   │     │  (OAuth + REST)      │
└─────────────┘     └──────────────────┘     └─────────────────────┘
       │                      │
       │  /api/jobs           │  OAuth token
       │  /api/jobs/:id       │  Bearer {token}
       │  /api/jobs/:id/      │
       │    publication       │
       │  /api/candidates     │
       ▼                      ▼
```

### 4.5 API Routes — Detalhamento

#### GET `/api/jobs`

Lista vagas públicas do departamento **techco.lab** com status `sourcing`, `interview` ou `offer`.

**Query params:**

- `city` — Filtrar por cidade
- `search` — Busca em título, departamento e cidade
- `limit` — Limite de resultados (default: 100)
- `pageId` — Paginação

**Resposta:**

```json
{
  "totalFound": 10,
  "jobs": [...],
  "cities": ["Curitiba", "Pomerode"],
  "nextPageId": "..."
}
```

**Filtros aplicados no backend:**

- `postingStatus === "PUBLIC"`
- `status` em `["sourcing", "interview", "offer"]`
- `department.label === "techco.lab"`

#### GET `/api/jobs/[id]`

Retorna detalhes completos de uma vaga (jobAd, location, typeOfEmployment, etc.).

#### GET `/api/jobs/[id]/publication`

Retorna a publicação ativa na "Default Career Page" para obter o `postingId` usado na URL de candidatura:

```
https://jobs.smartrecruiters.com/oneclick-ui/company/NETZSCHGroup/publication/{postingId}?dcr_ci=NETZSCHGroup
```

#### POST `/api/candidates`

Cria candidato no talent pool e faz upload do CV.

**Body (FormData):**

- `name` — Nome completo
- `email` — E-mail
- `file` — CV (PDF, DOC, DOCX, máx. 10MB)

**Validações:**

- E-mail válido
- Tipos permitidos: PDF, DOC, DOCX
- Tamanho máximo: 10MB

### 4.6 Consumo no Frontend


| Componente       | Endpoint                        | Descrição                            |
| ---------------- | ------------------------------- | ------------------------------------ |
| `JobsList`       | `GET /api/jobs`                 | Lista vagas na página Open Positions |
| `JobDetails`     | `GET /api/jobs/:id`             | Detalhes da vaga (SSR)               |
| `JobDetails`     | `GET /api/jobs/:id/publication` | Ao clicar em "Apply"                 |
| `TalentPoolForm` | `POST /api/candidates`          | Envio para talent pool               |

### 4.7 Módulo Compartilhado

O `lib/smartrecruiters.ts` exporta `getPublicJobs()` para obter vagas públicas diretamente da API SmartRecruiters. Utilizado pelo **sitemap** para incluir URLs dinâmicas de vagas. Em build sem credenciais configuradas, retorna array vazio sem falhar.

## 5. Internacionalização (i18n)

### 5.1 Configuração

- **Locales:** `en` (padrão), `pt-BR`
- **Biblioteca:** next-intl
- **Arquivos de mensagens:** `messages/en.json`, `messages/pt.json`
- **Prefixo de locale:** `as-needed` — inglês sem prefixo, português com `/pt-BR`

### 5.2 Middleware

O `middleware.ts`:

1. Redireciona `www.` para domínio canônico (301)
2. Aplica o middleware do next-intl para roteamento por locale

### 5.3 Rotas Localizadas

Com `localePrefix: "as-needed"`, o inglês usa URLs sem prefixo (alinhado ao canonical escolhido pelo Google):

| Rota EN              | Rota PT-BR              |
| -------------------- | ----------------------- |
| `/`                  | `/pt-BR`                |
| `/open-positions`    | `/pt-BR/open-positions` |
| `/what-we-do`        | `/pt-BR/what-we-do`     |
| `/our-culture`       | `/pt-BR/our-culture`    |
| `/imprint`           | `/pt-BR/aviso-legal`    |
| `/privacy-policy`    | `/pt-BR/privacy-policy` |
| `/search?q=`         | `/pt-BR/search?q=`       |
| `/positions/[id]`    | `/pt-BR/positions/[id]` |


---

## 6. Variáveis de Ambiente

### 6.1 Obrigatórias para Produção


| Variável                        | Descrição                                                       | Onde usar        |
| ------------------------------- | --------------------------------------------------------------- | ---------------- |
| `SMARTRECRUITERS_CLIENT_ID`     | Client ID OAuth                                                 | API Routes       |
| `SMARTRECRUITERS_CLIENT_SECRET` | Client Secret OAuth                                             | API Routes       |
| `NEXT_PUBLIC_COOKIEBOT_CBID`    | ID do Cookiebot                                                 | Cookiebot        |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ID GA4 (G-XXXXXXXXXX)                                           | Google Analytics |
| `NEXT_PUBLIC_BASE_URL`          | URL base (ex: [https://ntechcolab.com](https://ntechcolab.com)) | SSR, sitemap     |


### 6.2 Arquivo .env.example

```env
SMARTRECRUITERS_CLIENT_ID=
SMARTRECRUITERS_CLIENT_SECRET=
NEXT_PUBLIC_COOKIEBOT_CBID=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_BASE_URL=https://ntechcolab.com
```

**Importante:** Variáveis `NEXT_PUBLIC_`* são embutidas no build. Em Docker, devem ser passadas como `--build-arg`.

---

## 7. Build da Aplicação

### 7.1 Pré-requisitos

- **Node.js** 20+
- **pnpm** 9+

### 7.2 Comandos


| Comando        | Descrição                         |
| -------------- | --------------------------------- |
| `pnpm install` | Instalar dependências             |
| `pnpm build`   | Build de produção                 |
| `pnpm dev`     | Servidor de desenvolvimento       |
| `pnpm start`   | Servidor de produção (após build) |
| `pnpm lint`    | Executar ESLint                   |


### 7.3 Build Local

```bash
# 1. Copiar variáveis de ambiente
cp .env.example .env.local

# 2. Preencher .env.local com credenciais reais

# 3. Instalar dependências
pnpm install

# 4. Build
pnpm build
```

O output é gerado em `.next/` com o modo **standalone** habilitado para deploy em container.

### 7.4 Output Standalone

O `next.config.ts` define `output: 'standalone'`, gerando:

- `.next/standalone/` — Aplicação autocontida
- `.next/static/` — Assets estáticos
- `server.js` — Entry point do servidor

---

## 8. Deploy com Docker

### 8.1 Build da Imagem

```bash
docker build \
  --build-arg NEXT_PUBLIC_COOKIEBOT_CBID=seu-cbid \
  --build-arg NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX \
  -t techcolab-landing .
```

### 8.2 Variáveis em Runtime

As credenciais do SmartRecruiters **não** são build args — devem ser injetadas em runtime:

```bash
docker run -p 3000:3000 \
  -e SMARTRECRUITERS_CLIENT_ID=xxx \
  -e SMARTRECRUITERS_CLIENT_SECRET=xxx \
  -e NEXT_PUBLIC_BASE_URL=https://ntechcolab.com \
  techcolab-landing
```

### 8.3 Docker Compose

```yaml
services:
  web:
    build:
      context: .
      args:
        NEXT_PUBLIC_COOKIEBOT_CBID: ${NEXT_PUBLIC_COOKIEBOT_CBID}
        NEXT_PUBLIC_GA_MEASUREMENT_ID: ${NEXT_PUBLIC_GA_MEASUREMENT_ID}
    environment:
      - SMARTRECRUITERS_CLIENT_ID=${SMARTRECRUITERS_CLIENT_ID}
      - SMARTRECRUITERS_CLIENT_SECRET=${SMARTRECRUITERS_CLIENT_SECRET}
      - NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
    ports:
      - "3000:3000"
```

---

## 9. CI/CD (GitHub Actions)

**Workflow:** `.github/workflows/deploy.yml`

**Trigger:** Push na branch `main`

**Etapas:**

1. Checkout do repositório
2. Login no Azure Container Registry (ACR)
3. Build da imagem Docker
4. Push para `crtechcolabbrsprd.azurecr.io/ntechcolab/landingpage`
5. Deploy no Azure App Service (`techco-lab`)

**Secrets necessários:**

- `ACR_USERNAME`
- `ACR_PASSWORD`
- `AZURE_WEBAPP_PUBLISH_PROFILE`

**Observação:** O workflow atual não passa `--build-arg` para as variáveis `NEXT_PUBLIC_`*. Essas devem estar configuradas no App Service ou no pipeline.

---

## 10. Analytics e Privacidade

### 10.1 Cookiebot

- Gerenciamento de consentimento (GDPR/LGPD)
- Bloqueio de cookies até consentimento
- Banner multilíngue

### 10.2 Google Analytics 4

- Consent Mode v2
- Eventos de recrutamento: `view_job`, `begin_application`, `application_complete`
- UTM parameters e conversões

### 10.3 Eventos Customizados

| Evento                 | Categoria   | Uso                                   |
| ---------------------- | ----------- | ------------------------------------- |
| `view_job`             | recruitment | Visualização de vaga                  |
| `view_jobs_page`       | recruitment | Visualização da página de vagas       |
| `begin_application`    | recruitment | Clique em Apply                       |
| `application_complete` | recruitment | Redirecionamento para SmartRecruiters |
| `cta_click`            | engagement  | Cliques em CTAs                       |
| `section_view`         | navigation  | Navegação entre seções                |
| `language_change`      | settings    | Mudança de idioma                     |

**Referência completa:** `docs_analytics.md`


---

## 11. SEO e Metadados

### 11.1 Sitemap

- **Arquivo:** `app/sitemap.ts`
- **Conteúdo:** Rotas estáticas, localizadas e **vagas dinâmicas** (via `lib/smartrecruiters.ts`)
- **Canonicals:** Alinhados com `localePrefix: "as-needed"` (en sem prefixo)

### 11.2 Robots

- **Arquivo:** `app/robots.ts`
- Permite crawlers, bloqueia `/api/`, `/_next/`, `/static/`

### 11.3 Metadados Dinâmicos

- **Páginas de vagas:** Título e descrição gerados a partir de `job.title` e `job.location.city`
- **Imprint / Aviso Legal:** `robots: { index: false, follow: true }` — conteúdo legal não indexado

### 11.4 llms.txt

Padrão de descoberta por IAs (similar a `robots.txt` para crawlers). Oferece às LLMs um resumo estruturado em Markdown em vez de rastrear todo o HTML do site.

| Aspecto | Detalhe |
| ------- | ------- |
| **Arquivo** | `public/llms.txt` |
| **URL** | `https://ntechcolab.com/llms.txt` |
| **Implementação** | Arquivo estático em `public/` — Next.js serve na raiz automaticamente |
| **Formato** | Markdown, UTF-8 |
| **Especificação** | [llmstxt.org](https://www.llmstxt.org/) / [ai-visibility.org.uk](https://www.ai-visibility.org.uk/specifications/llms-txt/) |

**Estrutura do arquivo:**

- **H1 + Blockquote:** Nome da organização e resumo em 1–3 frases
- **About Techco.lab:** Descrição do hub, capacidades (Industrial AI, Connected Platforms, Digital Interfaces, Predictive Analytics)
- **Careers at Techco.lab:** Benefícios (CLT, PPL, saúde, wellness, educação, híbrido), localizações (Curitiba, Pomerode), link para vagas
- **Contact:** Website, LinkedIn, e-mail, empresa-mãe
- **Certifications:** Great Place to Work®
- **Key Facts:** Métricas e contexto (usuários, países, projetos)

**Nota técnica:** O arquivo deve permanecer em `public/llms.txt`. Não criar route handler em `app/llms.txt/route.ts` — Next.js gera conflito quando existem ambos (erro: "conflicting public file and page file").

**Validação:** [llms-txt.io/validator](https://llms-txt.io/validator) | [directory.llmstxt.cloud](https://directory.llmstxt.cloud/)

### 11.5 Estrutura

- **JSON-LD:** Schema.org Organization (com @id, logo, parentOrganization, contactPoint), WebSite (com SearchAction para Sitelinks Search Box) e JobPosting no layout e páginas — centralizado em `lib/schema.ts`
- **Open Graph / Twitter:** Metadados em `app/layout.tsx`
- **BreadcrumbSchema:** URLs padronizadas conforme locale

### 11.6 Busca

- **Página:** `/search?q=` e `/pt-BR/search?q=`
- **API:** `GET /api/search?q=&locale=` — busca vagas (via `/api/jobs`) e páginas estáticas (via `lib/searchIndex.ts`)
- **Segurança:** `lib/searchValidation.ts` — validação de locale, sanitização de query, validação de job ID e paths internos antes de renderizar links

---

## 12. Considerações de Segurança

- Credenciais SmartRecruiters apenas no servidor (nunca expostas ao cliente)
- Validação de entrada em `/api/candidates` (email, tipo e tamanho de arquivo)
- Validação em `/api/search`: locale (whitelist en/pt-BR), query (sanitização, limite 200 chars), job ID (regex alphanumérico)
- Validação de URLs dinâmicas em `SearchPage`: `toSafeInternalPath()` antes de usar em links — evita open redirect e path traversal
- Usuário não-root no container Docker
- Variáveis sensíveis via ambiente, não hardcoded

---

## 13. Referências

- [SmartRecruiters API](https://developers.smartrecruiters.com/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [next-intl](https://next-intl.dev/)
- [Cookiebot](https://www.cookiebot.com/)
- [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [llms.txt — llmstxt.org](https://www.llmstxt.org/)
- [llms.txt Specification — ai-visibility.org.uk](https://www.ai-visibility.org.uk/specifications/llms-txt/)

