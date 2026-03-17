/**
 * Índice estático de páginas para busca.
 * Cada página possui termos em EN e PT-BR para matching.
 */

export interface SearchablePage {
  path: string;
  pathPtBr: string;
  titleEn: string;
  titlePtBr: string;
  searchTermsEn: string[];
  searchTermsPtBr: string[];
}

export const searchablePages: SearchablePage[] = [
  {
    path: "/",
    pathPtBr: "/pt-BR",
    titleEn: "Home",
    titlePtBr: "Início",
    searchTermsEn: [
      "home",
      "techco",
      "netzsch",
      "innovation",
      "digital",
      "hub",
      "careers",
      "technology",
    ],
    searchTermsPtBr: [
      "início",
      "techco",
      "netzsch",
      "inovação",
      "digital",
      "hub",
      "carreiras",
      "tecnologia",
    ],
  },
  {
    path: "/what-we-do",
    pathPtBr: "/pt-BR/what-we-do",
    titleEn: "What we do",
    titlePtBr: "O que fazemos",
    searchTermsEn: [
      "what we do",
      "projects",
      "software",
      "data",
      "ai",
      "digital strategy",
      "development",
    ],
    searchTermsPtBr: [
      "o que fazemos",
      "projetos",
      "software",
      "dados",
      "ia",
      "estratégia digital",
      "desenvolvimento",
    ],
  },
  {
    path: "/our-culture",
    pathPtBr: "/pt-BR/our-culture",
    titleEn: "Culture",
    titlePtBr: "Cultura",
    searchTermsEn: [
      "culture",
      "team",
      "work",
      "hybrid",
      "benefits",
      "gptw",
      "great place",
    ],
    searchTermsPtBr: [
      "cultura",
      "equipe",
      "trabalho",
      "híbrido",
      "benefícios",
      "gptw",
      "great place",
    ],
  },
  {
    path: "/open-positions",
    pathPtBr: "/pt-BR/open-positions",
    titleEn: "Open positions",
    titlePtBr: "Vagas abertas",
    searchTermsEn: [
      "open positions",
      "jobs",
      "careers",
      "vacancies",
      "curitiba",
      "pomerode",
      "apply",
    ],
    searchTermsPtBr: [
      "vagas abertas",
      "vagas",
      "carreiras",
      "emprego",
      "curitiba",
      "pomerode",
      "candidatar",
    ],
  },
];

function matchesQuery(terms: string[], query: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return false;
  return terms.some((t) => t.toLowerCase().includes(q) || q.includes(t.toLowerCase()));
}

export function searchPages(query: string, locale: "en" | "pt-BR"): SearchablePage[] {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();
  return searchablePages.filter((page) => {
    const terms = locale === "pt-BR" ? page.searchTermsPtBr : page.searchTermsEn;
    const title = locale === "pt-BR" ? page.titlePtBr : page.titleEn;
    return (
      matchesQuery(terms, query) ||
      title.toLowerCase().includes(q) ||
      q.includes(title.toLowerCase())
    );
  });
}
