'use client';

import Script from 'next/script';
import { useEffect, useCallback } from 'react';

/**
 * Cookiebot ID - Obtenha em: https://manage.cookiebot.com
 * Configure a variável NEXT_PUBLIC_COOKIEBOT_CBID no .env
 */
const COOKIEBOT_CBID = process.env.NEXT_PUBLIC_COOKIEBOT_CBID || '';

// Estender a declaração global do Window para Cookiebot
declare global {
  interface Window {
    CookiebotCallback_OnAccept?: () => void;
    CookiebotCallback_OnDecline?: () => void;
  }
}

/**
 * Hook para verificar consentimento de cookies
 */
export function useCookieConsent() {
  const hasStatisticsConsent = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    return window.Cookiebot?.consent?.statistics ?? false;
  }, []);

  const hasMarketingConsent = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    return window.Cookiebot?.consent?.marketing ?? false;
  }, []);

  const hasPreferencesConsent = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    return window.Cookiebot?.consent?.preferences ?? false;
  }, []);

  const showCookieDialog = useCallback((): void => {
    if (typeof window !== 'undefined' && window.Cookiebot) {
      // Usar renew em vez de show para reabrir o diálogo
      (window.Cookiebot as { renew?: () => void }).renew?.();
    }
  }, []);

  const renewConsent = useCallback((): void => {
    if (typeof window !== 'undefined' && window.Cookiebot) {
      (window.Cookiebot as { renew?: () => void }).renew?.();
    }
  }, []);

  return {
    hasStatisticsConsent,
    hasMarketingConsent,
    hasPreferencesConsent,
    showCookieDialog,
    renewConsent,
  };
}

/**
 * Componente Cookiebot para gerenciamento de consentimento
 * 
 * Funcionalidades:
 * - Exibe banner de consentimento de cookies
 * - Bloqueia cookies de terceiros até consentimento (modo auto)
 * - Integra com GA4 (bloqueia até consentimento de "statistics")
 * - Suporte a múltiplos idiomas
 * - Conformidade com GDPR/LGPD
 * 
 * Configuração no Cookiebot:
 * 1. Adicionar domínio no Cookiebot Manager
 * 2. Configurar categorias de cookies
 * 3. Marcar Google Analytics como "Statistics"
 * 4. Ativar "Auto-blocking mode"
 */
export function Cookiebot() {
  useEffect(() => {
    // Callback quando o usuário aceita cookies
    window.CookiebotCallback_OnAccept = () => {
      // Disparar evento customizado para o GA4 reagir
      window.dispatchEvent(new CustomEvent('cookieConsentAccepted', {
        detail: window.Cookiebot?.consent
      }));
      
      // Log para debug (remover em produção se necessário)
      if (process.env.NODE_ENV === 'development') {
        console.log('[Cookiebot] Consent accepted:', window.Cookiebot?.consent);
      }
    };

    // Callback quando o usuário recusa cookies
    window.CookiebotCallback_OnDecline = () => {
      window.dispatchEvent(new CustomEvent('cookieConsentDeclined'));
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[Cookiebot] Consent declined');
      }
    };

    return () => {
      // Cleanup
      delete window.CookiebotCallback_OnAccept;
      delete window.CookiebotCallback_OnDecline;
    };
  }, []);

  // Não carregar se CBID não estiver configurado
  if (!COOKIEBOT_CBID) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Cookiebot] CBID não configurado. Defina NEXT_PUBLIC_COOKIEBOT_CBID no .env');
    }
    return null;
  }

  return (
    <>
      {/* 
        Script principal do Cookiebot
        Nota: Em App Router, beforeInteractive não é suportado fora de _document.
        Usamos afterInteractive, mas o auto-blocking ainda funciona.
      */}
      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid={COOKIEBOT_CBID}
        data-blockingmode="auto"
        data-culture="auto"
        strategy="afterInteractive"
      />
    </>
  );
}

/**
 * Componente para exibir a declaração de cookies em uma página
 * Use em páginas de política de privacidade/cookies
 */
export function CookieDeclaration() {
  if (!COOKIEBOT_CBID) return null;

  return (
    <div id="CookieDeclaration">
      <Script
        id="CookieDeclarationScript"
        src={`https://consent.cookiebot.com/${COOKIEBOT_CBID}/cd.js`}
        strategy="afterInteractive"
        async
      />
    </div>
  );
}

/**
 * Botão para abrir o diálogo de gerenciamento de cookies
 * Use em links como "Gerenciar Cookies" no footer
 */
export function CookieSettingsButton({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  const { renewConsent } = useCookieConsent();

  return (
    <button
      onClick={renewConsent}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}

export default Cookiebot;
