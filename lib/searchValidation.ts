/**
 * Validação e sanitização para busca e URLs dinâmicas.
 * Princípio do menor privilégio: whitelist de caracteres e limites rígidos.
 */

const VALID_LOCALES = ["en", "pt-BR"] as const;
const MAX_QUERY_LENGTH = 200;
const MAX_JOB_ID_LENGTH = 100;
const JOB_ID_REGEX = /^[a-zA-Z0-9_-]+$/;
const SAFE_PATH_REGEX = /^\/(?:[a-zA-Z0-9_-]+\/?)*$/;

/**
 * Valida e retorna locale seguro. Fallback para "en".
 */
export function validateLocale(value: string | null): "en" | "pt-BR" {
  if (value && VALID_LOCALES.includes(value as (typeof VALID_LOCALES)[number])) {
    return value as "en" | "pt-BR";
  }
  return "en";
}

/**
 * Sanitiza query de busca: trim, limite de tamanho, remove caracteres de controle.
 */
export function sanitizeSearchQuery(value: string | null): string {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim();
  if (trimmed.length > MAX_QUERY_LENGTH) {
    return trimmed.slice(0, MAX_QUERY_LENGTH);
  }
  return trimmed.replace(/[\x00-\x1F\x7F]/g, "");
}

/**
 * Valida job ID antes de construir URL. Retorna true se seguro.
 */
export function isValidJobId(id: unknown): boolean {
  if (typeof id !== "string") return false;
  if (id.length === 0 || id.length > MAX_JOB_ID_LENGTH) return false;
  return JOB_ID_REGEX.test(id);
}

/**
 * Valida path interno antes de usar em Link.
 * Deve começar com /, sem protocolo, sem path traversal.
 */
export function isSafeInternalPath(path: string): boolean {
  if (!path || typeof path !== "string") return false;
  if (!path.startsWith("/")) return false;
  if (path.includes("//") || path.includes(":")) return false;
  if (path.includes("..")) return false;
  if (path.length > 500) return false;
  return SAFE_PATH_REGEX.test(path);
}

/**
 * Extrai path seguro de URL retornada pela API.
 * Garante que apenas paths internos sejam usados.
 */
export function toSafeInternalPath(url: string): string | null {
  try {
    const parsed = new URL(url, "https://ntechcolab.com");
    const path = parsed.pathname;
    if (isSafeInternalPath(path)) return path;
  } catch {
    // URL inválida
  }
  return null;
}
