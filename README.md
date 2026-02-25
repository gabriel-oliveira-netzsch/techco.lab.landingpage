# Techco.lab Landing Page

Landing page institucional do **Techco.lab**, o hub de inovação digital do grupo NETZSCH. O site apresenta a cultura, projetos, vagas abertas e informações sobre a equipe.

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
│   ├── [locale]/           # Rotas internacionalizadas (en, pt)
│   │   ├── open-positions/ # Página de vagas
│   │   ├── our-culture/    # Página de cultura
│   │   ├── what-we-do/     # Página de projetos
│   │   └── positions/[id]/ # Detalhes de vaga
│   ├── api/                # API Routes
│   │   └── jobs/           # Endpoints de vagas
│   ├── layout.tsx          # Layout raiz
│   ├── robots.ts           # Configuração robots.txt
│   └── sitemap.ts          # Sitemap dinâmico
├── components/
│   ├── sections/           # Seções das páginas
│   ├── jobs/               # Componentes de vagas
│   ├── ui/                 # Componentes UI base (shadcn)
│   ├── icons/              # Ícones SVG
│   ├── Cookiebot.tsx       # Gerenciamento de cookies
│   └── GoogleAnalytics.tsx # Analytics
├── lib/
│   ├── analytics.ts        # Utilitários GA4
│   └── utils.ts            # Funções auxiliares
├── messages/
│   ├── en.json             # Traduções inglês
│   └── pt.json             # Traduções português
└── i18n/                   # Configuração i18n
```

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
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

O site suporta dois idiomas:

- 🇺🇸 **Inglês** (`/en`) - padrão
- 🇧🇷 **Português** (`/pt-br`)

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
docker run -p 3000:3000 techcolab-landing
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
    ports:
      - "3000:3000"
```

Execute com:

```bash
# Com .env na raiz
docker compose up --build
```

## 📄 Licença

Projeto proprietário - NETZSCH Group © 2025
