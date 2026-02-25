/**
 * Google Analytics 4 (GA4) - Utilitários de tracking
 * 
 * Funcionalidades:
 * - Sessões e duração da sessão (automático pelo GA4)
 * - Pageviews
 * - Taxa de conversão de aplicações a vagas
 * - Eventos personalizados
 * - UTM parameters
 * - Localização geográfica (automático pelo GA4)
 * - client_id e user_id (automático pelo GA4)
 * - Dados demográficos (configurar no GA4 console)
 */

// ID de medição do GA4 - configurar via NEXT_PUBLIC_GA_MEASUREMENT_ID no .env
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Tipos para eventos do GA4
type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
};

// Declaração global do gtag e Cookiebot
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'set' | 'js' | 'consent',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
    Cookiebot?: {
      consent: {
        necessary: boolean;
        preferences: boolean;
        statistics: boolean;
        marketing: boolean;
      };
      show: () => void;
      hide: () => void;
      renew: () => void;
      withdraw: () => void;
    };
  }
}

/**
 * Verifica se o GA4 está disponível
 */
export const isGtagAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * Verifica se o usuário deu consentimento para cookies de estatística
 */
export const hasStatisticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.Cookiebot?.consent?.statistics ?? false;
};

/**
 * Verifica se o usuário deu consentimento para cookies de marketing
 */
export const hasMarketingConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.Cookiebot?.consent?.marketing ?? false;
};

/**
 * Registra um pageview
 */
export const pageview = (url: string, title?: string): void => {
  if (!isGtagAvailable()) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
    page_title: title,
  });
};

/**
 * Registra um evento genérico
 */
export const event = ({ action, category, label, value, ...rest }: GTagEvent): void => {
  if (!isGtagAvailable()) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...rest,
  });
};

// ============================================
// EVENTOS ESPECÍFICOS DO SITE
// ============================================

/**
 * Evento: Clique em "Explore Our Work" ou similar
 */
export const trackExploreWork = (source: string): void => {
  event({
    action: 'explore_work_click',
    category: 'engagement',
    label: source,
  });
};

/**
 * Evento: Visualização de página de vagas
 */
export const trackJobsPageView = (): void => {
  event({
    action: 'view_jobs_page',
    category: 'recruitment',
    label: 'open_positions',
  });
};

/**
 * Evento: Visualização de detalhes de uma vaga específica
 */
export const trackJobView = (jobId: string, jobTitle: string): void => {
  event({
    action: 'view_job',
    category: 'recruitment',
    label: jobTitle,
    job_id: jobId,
  });
};

/**
 * Evento: Início de aplicação a uma vaga (clique em "Apply")
 */
export const trackJobApplicationStart = (jobId: string, jobTitle: string): void => {
  event({
    action: 'begin_application',
    category: 'recruitment',
    label: jobTitle,
    job_id: jobId,
  });
};

/**
 * Evento: Aplicação completa a uma vaga (conversão)
 * Este é o evento principal para medir taxa de conversão
 */
export const trackJobApplicationComplete = (jobId: string, jobTitle: string): void => {
  event({
    action: 'application_complete',
    category: 'recruitment',
    label: jobTitle,
    job_id: jobId,
    conversion: true,
  });
  
  // Também registrar como conversão do GA4
  if (isGtagAvailable()) {
    window.gtag('event', 'conversion', {
      send_to: GA_MEASUREMENT_ID,
      event_category: 'recruitment',
      event_label: jobTitle,
    });
  }
};

/**
 * Evento: Clique em CTA principal (ex: "Ver vagas abertas")
 */
export const trackCTAClick = (ctaName: string, location: string): void => {
  event({
    action: 'cta_click',
    category: 'engagement',
    label: ctaName,
    cta_location: location,
  });
};

/**
 * Evento: Navegação entre seções
 */
export const trackSectionView = (sectionName: string): void => {
  event({
    action: 'section_view',
    category: 'navigation',
    label: sectionName,
  });
};

/**
 * Evento: Mudança de idioma
 */
export const trackLanguageChange = (fromLang: string, toLang: string): void => {
  event({
    action: 'language_change',
    category: 'settings',
    label: `${fromLang}_to_${toLang}`,
    from_language: fromLang,
    to_language: toLang,
  });
};

/**
 * Evento: Clique em link externo
 */
export const trackExternalLink = (url: string, linkText: string): void => {
  event({
    action: 'external_link_click',
    category: 'outbound',
    label: linkText,
    destination_url: url,
  });
};

/**
 * Evento: Interação com carrossel de testimonials
 */
export const trackTestimonialInteraction = (action: 'next' | 'previous' | 'dot', testimonialIndex: number): void => {
  event({
    action: 'testimonial_interaction',
    category: 'engagement',
    label: action,
    testimonial_index: testimonialIndex,
  });
};

/**
 * Evento: Scroll até seção específica
 */
export const trackScrollToSection = (sectionId: string, percentVisible: number): void => {
  event({
    action: 'scroll_to_section',
    category: 'engagement',
    label: sectionId,
    percent_visible: percentVisible,
  });
};

/**
 * Evento: Tempo de permanência em página
 */
export const trackTimeOnPage = (pagePath: string, timeInSeconds: number): void => {
  event({
    action: 'time_on_page',
    category: 'engagement',
    label: pagePath,
    value: timeInSeconds,
    time_seconds: timeInSeconds,
  });
};

// ============================================
// UTM PARAMETERS
// ============================================

/**
 * Captura UTM parameters da URL atual
 */
export const getUTMParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  
  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });
  
  return utmParams;
};

/**
 * Registra UTM parameters como evento (útil para relatórios)
 */
export const trackUTMParams = (): void => {
  const utmParams = getUTMParams();
  
  if (Object.keys(utmParams).length > 0) {
    event({
      action: 'campaign_visit',
      category: 'marketing',
      label: utmParams.utm_campaign || 'unknown',
      ...utmParams,
    });
  }
};

/**
 * Armazena UTM params no sessionStorage para persistência durante a sessão
 */
export const persistUTMParams = (): void => {
  if (typeof window === 'undefined') return;
  
  const utmParams = getUTMParams();
  
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
  }
};

/**
 * Recupera UTM params armazenados
 */
export const getStoredUTMParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = sessionStorage.getItem('utm_params');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

