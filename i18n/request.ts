import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from './config';

// Map locale to message file name
const localeToFile: Record<Locale, string> = {
  en: 'en',
  'pt-BR': 'pt',
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate that the incoming locale is valid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'en';
  }

  const messageFile = localeToFile[locale as Locale] || 'en';

  return {
    locale,
    messages: (await import(`../messages/${messageFile}.json`)).default,
  };
});
