# =============================================
# Dockerfile para Next.js App com pnpm
# Multi-stage build otimizado para produção
# =============================================

# ---------------------------------------------
# Stage 1: Base
# Imagem base com Node.js e pnpm
# ---------------------------------------------
FROM node:20-alpine AS base

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat

# Habilitar corepack para usar pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# ---------------------------------------------
# Stage 2: Dependencies
# Instalar apenas as dependências
# ---------------------------------------------
FROM base AS deps

# Copiar apenas arquivos necessários para instalação
COPY package.json pnpm-lock.yaml ./

# Instalar dependências (incluindo devDependencies para build)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

# ---------------------------------------------
# Stage 3: Builder
# Compilar a aplicação Next.js
# ---------------------------------------------
FROM base AS builder

WORKDIR /app

# Copiar dependências instaladas
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fonte
COPY . .

# Desabilitar telemetria do Next.js durante build
ENV NEXT_TELEMETRY_DISABLED=1

# =============================================
# Variáveis de ambiente públicas (NEXT_PUBLIC_*)
# Estas variáveis são "inlined" durante o build
# e devem ser passadas como --build-arg
# =============================================
ARG NEXT_PUBLIC_COOKIEBOT_CBID
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID

ENV NEXT_PUBLIC_COOKIEBOT_CBID=$NEXT_PUBLIC_COOKIEBOT_CBID
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID

# Build da aplicação
RUN pnpm build

# ---------------------------------------------
# Stage 4: Runner
# Imagem final de produção (mínima)
# ---------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Definir ambiente de produção
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Criar usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar arquivos públicos
COPY --from=builder /app/public ./public

# Criar diretório para cache do Next.js com permissões corretas
RUN mkdir .next && chown nextjs:nodejs .next

# Copiar build standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Trocar para usuário não-root
USER nextjs

# Expor porta padrão do Next.js
EXPOSE 3000

# Variável de ambiente para hostname (necessário em containers)
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]

