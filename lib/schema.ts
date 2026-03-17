/**
 * Schema.org JSON-LD para SEO e Google Knowledge Panel.
 * Centraliza dados estruturados conforme recomendações do Google.
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

const BASE_URL = "https://ntechcolab.com";

/**
 * Schema Organization completo para Knowledge Panel.
 * Propriedades essenciais: @id, name, url, logo.
 * Propriedades recomendadas: description, address, contactPoint, sameAs, parentOrganization.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Techco.lab",
  alternateName: "Techco.lab",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/images/techco_lab_logo.jpeg`,
    width: 1200,
    height: 630,
  },
  description:
    "Techco.lab is the digital innovation hub of NETZSCH, hiring professionals in Data, Cloud, Software, UX and Product for hybrid roles in Brazil.",
  foundingDate: "2020",
  parentOrganization: {
    "@type": "Organization",
    "@id": "https://www.netzsch.com/#organization",
    name: "NETZSCH Group",
    url: "https://www.netzsch.com",
  },
  sameAs: [
    "https://www.linkedin.com/company/techco-lab",
    "https://www.netzsch.com/en/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "careers",
    email: "info@netzsch.com",
    url: `${BASE_URL}/open-positions`,
    areaServed: "BR",
    availableLanguage: ["English", "Portuguese"],
  },
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      addressCountry: "BR",
      name: "Nex Coworking",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Pomerode",
      addressRegion: "SC",
      addressCountry: "BR",
      name: "NEM Headquarters",
    },
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 50,
    maxValue: 100,
  },
} as const;

/**
 * Schema WebSite para Sitelinks Search Box.
 * potentialAction permite que o Google exiba caixa de busca no Knowledge Panel.
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Techco.lab",
  url: BASE_URL,
  inLanguage: ["en", "pt-BR"],
  publisher: {
    "@id": `${BASE_URL}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
} as const;
