interface OrganizationJsonLdProps {
  locale?: string;
}

export function OrganizationJsonLd({ locale = 'en' }: OrganizationJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Techco.lab',
    alternateName: 'Techco Lab',
    url: 'https://ntechcolab.com',
    logo: 'https://ntechcolab.com/logo.png',
    sameAs: [
      'https://www.linkedin.com/company/techco-lab',
      'https://www.netzsch.com/en/',
    ],
    description:
      locale === 'pt-BR'
        ? 'Techco.lab é o hub de inovação digital da NETZSCH, contratando profissionais de Data, Cloud, Software, UX e Produto para vagas híbridas no Brasil.'
        : 'Techco.lab is the digital innovation hub of NETZSCH, hiring professionals in Data, Cloud, Software, UX and Product for hybrid roles in Brazil.',
    parentOrganization: {
      '@type': 'Organization',
      name: 'NETZSCH Group',
      url: 'https://www.netzsch.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: 'Paraná',
      addressLocality: 'Curitiba',
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
      maxValue: 100,
    },
    foundingDate: '2020',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Techco.lab',
    url: 'https://ntechcolab.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://ntechcolab.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['en', 'pt-BR'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface JobPostingJsonLdProps {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  id: string;
}

export function JobPostingJsonLd({
  title,
  description,
  location,
  employmentType,
  id,
}: JobPostingJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description,
    datePosted: new Date().toISOString().split('T')[0],
    validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    employmentType: employmentType.toUpperCase().replace('-', '_'),
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Techco.lab',
      sameAs: 'https://ntechcolab.com',
      logo: 'https://ntechcolab.com/logo.png',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.split(',')[0].trim(),
        addressCountry: 'BR',
      },
    },
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'Brazil',
    },
    jobLocationType: 'TELECOMMUTE',
    url: `https://ntechcolab.com/positions/${id}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbJsonLdProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

