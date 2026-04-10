# Techco.lab Landing Page

Landing page institucional do **Techco.lab**, o hub de inovação digital do grupo NETZSCH. O site apresenta a cultura, projetos, vagas abertas e talent pool integrado ao SmartRecruiters.

🌐 **Produção:** [https://ntechcolab.com](https://ntechcolab.com)

## 🚀 Stack Tecnológica

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| [Next.js](https://nextjs.org) | 16 | Framework React com App Router |
| [React](https://react.dev) | 19 | Biblioteca de UI |
| [TypeScript](https://www.typescriptlang.org) | 5 | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Framework CSS utility-first |
| [Radix UI](https://www.radix-ui.com) | - | Componentes acessíveis e headless |
| [next-intl](https://next-intl.dev) | 4 | Internacionalização (i18n) |
| [Motion](https://motion.dev) | 12 | Animações |

## 📁 Estrutura do Projeto

```
├── app/
│   ├── [locale]/           # Rotas internacionalizadas (en, pt-BR)
│   │   ├── page.tsx        # Home
│   │   ├── open-positions/# Página de vagas
│   │   ├── our-culture/    # Página de cultura
│   │   ├── what-we-do/     # Página de projetos
│   │   ├── positions/[id]/ # Detalhes de vaga (metadados dinâmicos)
│   │   ├── imprint/        # Aviso legal (EN)
│   │   ├── aviso-legal/    # Aviso legal (PT)
│   │   └── privacy-policy/ # Política de privacidade
│   ├── api/                # API Routes (BFF)
│   │   ├── jobs/           # Endpoints de vagas
│   │   └── candidates/    # Talent pool
│   ├── layout.tsx          # Layout raiz
│   ├── robots.ts           # Configuração robots.txt
│   └── sitemap.ts          # Sitemap dinâmico (inclui vagas)
├── components/
│   ├── sections/           # Seções das páginas
│   ├── jobs/               # Componentes de vagas
│   ├── ui/                 # Componentes UI base (shadcn)
│   ├── icons/              # Ícones SVG
│   ├── analytics/         # Tracking e analytics
│   ├── Cookiebot.tsx       # Gerenciamento de cookies
│   └── GoogleAnalytics.tsx # Analytics
├── lib/
│   ├── analytics.ts        # Utilitários GA4
│   ├── smartrecruiters.ts # Fetch de vagas (sitemap)
│   └── utils.ts           # Funções auxiliares
├── messages/
│   ├── en.json            # Traduções inglês
│   └── pt.json            # Traduções português
└── i18n/                  # Configuração i18n
```

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# ========================================
# SmartRecruiters - API de Vagas
# ========================================
SMARTRECRUITERS_CLIENT_ID=
SMARTRECRUITERS_CLIENT_SECRET=

# ========================================
# Cookiebot - Gerenciamento de Consentimento
# ========================================
# Obtenha o CBID em: https://manage.cookiebot.com
NEXT_PUBLIC_COOKIEBOT_CBID=

# ========================================
# Google Analytics 4 (GA4)
# ========================================
# Formato: G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# ========================================
# URL Base (SSR, sitemap)
# ========================================
NEXT_PUBLIC_BASE_URL=https://ntechcolab.com
```

## 🛠️ Desenvolvimento

### Pré-requisitos

- Node.js 20+
- pnpm 9+

### Instalação

```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia servidor de desenvolvimento |
| `pnpm build` | Gera build de produção |
| `pnpm start` | Inicia servidor de produção |
| `pnpm lint` | Executa ESLint |

## 🌍 Internacionalização

O site suporta dois idiomas com `localePrefix: "as-needed"` (inglês sem prefixo, alinhado ao canonical do Google):

- 🇺🇸 **Inglês** — URLs sem prefixo: `/`, `/open-positions`, `/what-we-do`, `/our-culture`, `/imprint`, `/privacy-policy`
- 🇧🇷 **Português** — URLs com prefixo: `/pt-BR`, `/pt-BR/open-positions`, `/pt-BR/aviso-legal`, etc.

As traduções ficam em `messages/en.json` e `messages/pt.json`.

## 🍪 Privacidade e Analytics

### Cookiebot
- Gerenciamento de consentimento GDPR/LGPD
- Bloqueio automático de cookies até consentimento
- Banner multilíngue

### Google Analytics 4
- Consent Mode v2 integrado
- Tracking condicional baseado em consentimento
- Eventos personalizados para recrutamento
- Suporte a UTM parameters

## 🐳 Docker

> ⚠️ **Importante:** As variáveis `NEXT_PUBLIC_*` são embutidas no código durante o build.
> Você **deve** passá-las como `--build-arg` para que funcionem corretamente.

### Build da Imagem

```bash
docker build \
  --build-arg NEXT_PUBLIC_COOKIEBOT_CBID=seu-cbid-aqui \
  --build-arg NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX \
  -t techcolab-landing .
```

### Executar Container

```bash
docker run -p 3000:3000 \
  -e SMARTRECRUITERS_CLIENT_ID=xxx \
  -e SMARTRECRUITERS_CLIENT_SECRET=xxx \
  -e NEXT_PUBLIC_BASE_URL=https://ntechcolab.com \
  techcolab-landing
```

### Build com Docker Compose (recomendado)

Crie um arquivo `docker-compose.yml`:

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

Execute com:

```bash
# Com .env na raiz
docker compose up --build
```

## 🔍 SEO

- **Sitemap dinâmico:** Rotas estáticas e vagas ativas (SmartRecruiters)
- **Metadados dinâmicos:** Vagas com título e descrição por vaga
- **Canonicals:** Alinhados com `localePrefix: "as-needed"`
- **Imprint/Aviso Legal:** `noindex` para conteúdo legal
- **llms.txt:** [https://ntechcolab.com/llms.txt](https://ntechcolab.com/llms.txt) — descoberta por IAs (identidade, serviços, contato)

## 📄 Licença

Projeto proprietário - NETZSCH Group © 2025
