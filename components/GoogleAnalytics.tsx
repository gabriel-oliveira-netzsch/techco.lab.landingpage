'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense, useState } from 'react';
import { GA_MEASUREMENT_ID, pageview, persistUTMParams, trackUTMParams } from '@/lib/analytics';

/**
 * Componente interno que faz o tracking de pageviews
 * Separado para usar useSearchParams com Suspense
 */
function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Verificar consentimento inicial
    const checkConsent = () => {
      if (typeof window !== 'undefined' && window.Cookiebot?.consent?.statistics) {
        setHasConsent(true);
      }
    };

    // Verificar imediatamente
    checkConsent();

    // Escutar evento de consentimento aceito
    const handleConsentAccepted = () => {
      checkConsent();
    };

    window.addEventListener('cookieConsentAccepted', handleConsentAccepted);
    
    // Fallback: verificar periodicamente nos primeiros segundos
    const interval = setInterval(checkConsent, 1000);
    setTimeout(() => clearInterval(interval), 5000);

    return () => {
      window.removeEventListener('cookieConsentAccepted', handleConsentAccepted);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Só trackear se houver consentimento
    if (!hasConsent) return;

    // Construir URL completa
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Registrar pageview
    pageview(url);
    
    // Persistir e trackear UTM params na primeira visita
    persistUTMParams();
    trackUTMParams();
  }, [pathname, searchParams, hasConsent]);

  return null;
}

/**
 * Componente Google Analytics 4
 * 
 * Integração com Cookiebot:
 * - Scripts marcados com data-cookieconsent="statistics"
 * - Cookiebot bloqueia automaticamente até consentimento
 * - Pageview tracker verifica consentimento antes de enviar
 * 
 * Funcionalidades automáticas:
 * - Carrega o gtag.js (após consentimento)
 * - Registra pageviews em cada navegação
 * - Captura e persiste UTM parameters
 * - Sessões e duração (automático pelo GA4)
 * - Localização geográfica (automático pelo GA4)
 * - client_id persistente (automático pelo GA4)
 * 
 * Para dados demográficos e interesses:
 * - Ativar no GA4 Admin > Property Settings > Data Collection
 */
export function GoogleAnalytics() {
  const isDev = process.env.NODE_ENV === 'development';
  
  // Verificar se o ID está configurado
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    if (isDev) {
      console.warn('[GA4] Measurement ID não configurado. Defina NEXT_PUBLIC_GA_MEASUREMENT_ID no .env');
    }
    return null;
  }

  return (
    <>
      {/* 
        Script do gtag.js
        data-cookieconsent="statistics" = Cookiebot bloqueia até consentimento
      */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        data-cookieconsent="statistics"
      />
      
      {/* 
        Configuração do GA4
        Também bloqueado pelo Cookiebot até consentimento de "statistics"
      */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        data-cookieconsent="statistics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Configuração padrão com consent mode v2
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
              cookie_flags: 'SameSite=None;Secure',
              anonymize_ip: true,
            });
            
            // Atualizar consentimento quando Cookiebot aceitar
            window.addEventListener('CookiebotOnAccept', function() {
              if (Cookiebot.consent.statistics) {
                gtag('consent', 'update', {
                  'analytics_storage': 'granted'
                });
              }
              if (Cookiebot.consent.marketing) {
                gtag('consent', 'update', {
                  'ad_storage': 'granted',
                  'ad_user_data': 'granted',
                  'ad_personalization': 'granted'
                });
              }
            });
          `,
        }}
      />
      
      {/* Tracker de pageviews com Suspense */}
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
    </>
  );
}

export default GoogleAnalytics;

