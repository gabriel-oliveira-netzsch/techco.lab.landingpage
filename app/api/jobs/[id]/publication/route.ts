import { NextRequest, NextResponse } from 'next/server';

interface SmartRecruitersToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface Publication {
  sourceName: string;
  type: string;
  publishedOn: string;
  unpublishedOn?: string;
  postingId: string;
}

interface PublicationResponse {
  content: Publication[];
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: 'Job ID is required' },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();

    const response = await fetch(
      `https://api.smartrecruiters.com/jobs/${id}/publication?activeOnly=true`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en',
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Publication not found', publication: null },
          { status: 200 }
        );
      }
      throw new Error(`Failed to fetch publication: ${response.status}`);
    }

    const data: PublicationResponse = await response.json();

    // Find the "Default Career Page" publication
    const defaultCareerPage = data.content.find(
      (pub) => pub.sourceName === 'Default Career Page'
    );

    if (!defaultCareerPage) {
      return NextResponse.json({
        publication: null,
        message: 'No active career page publication found',
      });
    }

    return NextResponse.json({
      publication: {
        postingId: defaultCareerPage.postingId,
        publishedOn: defaultCareerPage.publishedOn,
        sourceName: defaultCareerPage.sourceName,
      },
    });
  } catch (error) {
    console.error('Error fetching publication:', error);
    return NextResponse.json(
      { error: 'Failed to fetch publication', publication: null },
      { status: 500 }
    );
  }
}

