import { NextRequest, NextResponse } from "next/server";
import { searchPages } from "@/lib/searchIndex";
import { getPublicJobs } from "@/lib/smartrecruiters";
import {
  validateLocale,
  sanitizeSearchQuery,
  isValidJobId,
} from "@/lib/searchValidation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawQuery = searchParams.get("q") || "";
    const rawLocale = searchParams.get("locale");

    const q = sanitizeSearchQuery(rawQuery);
    const locale = validateLocale(rawLocale);

    if (!q) {
      return NextResponse.json({
        jobs: [],
        pages: [],
        totalJobs: 0,
        totalPages: 0,
      });
    }

    const origin = request.nextUrl.origin;
    const prefix = locale === "en" ? "" : `/${locale}`;

    const jobsData = await getPublicJobs(q);
    const jobs = jobsData
      .filter((job) => isValidJobId(job.id))
      .map((job) => ({
        id: job.id,
        title: String(job.title || "").slice(0, 200),
        city: String(job.location?.city || "").slice(0, 100),
        url: `${origin}${prefix}/positions/${job.id}`,
      }));

    // Buscar páginas estáticas
    const matchedPages = searchPages(q, locale);
    const pages = matchedPages.map((p) => ({
      title: locale === "pt-BR" ? p.titlePtBr : p.titleEn,
      url: `${origin}${locale === "pt-BR" ? p.pathPtBr : p.path}`,
    }));

    return NextResponse.json({
      jobs,
      pages,
      totalJobs: jobs.length,
      totalPages: pages.length,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { jobs: [], pages: [], totalJobs: 0, totalPages: 0, error: "Search failed" },
      { status: 500 }
    );
  }
}
