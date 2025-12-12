import { NextRequest, NextResponse } from 'next/server';

interface SmartRecruitersToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface JobLocation {
  countryCode: string;
  country: string;
  city: string;
  manual: boolean;
  remote: boolean;
  regionCode: string;
}

interface Job {
  id: string;
  title: string;
  refNumber: string;
  status: string;
  createdOn: string;
  updatedOn: string;
  lastActivityOn: string;
  department?: {
    label: string;
  };
  location: JobLocation;
  language: {
    code: string;
    label: string;
    labelNative: string;
  };
  postingStatus: string;
  customField?: Array<{
    fieldId: string;
    fieldLabel: string;
    valueId?: string;
    valueLabel?: string;
  }>;
}

interface JobsResponse {
  totalFound: number;
  offset: number;
  limit: number;
  nextPageId?: string;
  content: Job[];
}

// Cache token in memory
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  // Check if we have a valid cached token
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const clientId = process.env.SMARTRECRUITERS_CLIENT_ID;
  const clientSecret = process.env.SMARTRECRUITERS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('SmartRecruiters credentials not configured');
  }

  const response = await fetch('https://api.smartrecruiters.com/identity/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.status}`);
  }

  const data: SmartRecruitersToken = await response.json();

  // Cache the token with a buffer of 60 seconds before expiry
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  return data.access_token;
}

async function fetchJobs(
  accessToken: string,
  city?: string,
  limit: number = 100,
  pageId?: string
): Promise<JobsResponse> {
  const params = new URLSearchParams({
    limit: limit.toString(),
    sort: "job_id",
  });

  if (city && city !== "all") {
    params.append("city", city);
  }

  if (pageId) {
    params.append("pageId", pageId);
  }

  const response = await fetch(
    `https://api.smartrecruiters.com/jobs?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Accept-Language": "en",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.status}`);
  }

  return response.json();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city") || undefined;
    const search = searchParams.get("search") || "";
    const limit = parseInt(searchParams.get("limit") || "100", 10);
    const pageId = searchParams.get("pageId") || undefined;

    const accessToken = await getAccessToken();
    const jobsData = await fetchJobs(accessToken, city, limit, pageId);

    // Filter only PUBLIC jobs and apply search filter
    let filteredJobs = jobsData.content.filter(
      (job) =>
        job.postingStatus === "PUBLIC" &&
        ["sourcing", "interview", "offer"].includes(job.status.toLowerCase()) &&
        job.department?.label === "techco.lab"
    );

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.department?.label.toLowerCase().includes(searchLower) ||
          job.location.city.toLowerCase().includes(searchLower)
      );
    }

    // Get unique cities for filter options
    const cities = [
      ...new Set(filteredJobs.map((job) => job.location.city)),
    ].sort();

    return NextResponse.json({
      totalFound: filteredJobs.length,
      jobs: filteredJobs,
      cities,
      nextPageId: jobsData.nextPageId,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs", jobs: [], cities: [] },
      { status: 500 }
    );
  }
}

