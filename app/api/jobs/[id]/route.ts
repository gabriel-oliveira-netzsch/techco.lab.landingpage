import { NextRequest, NextResponse } from 'next/server';

interface SmartRecruitersToken {
  access_token: string;
  token_type: string;
  expires_in: number;
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
      `https://api.smartrecruiters.com/jobs/${id}`,
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
          { error: 'Job not found' },
          { status: 404 }
        );
      }
      throw new Error(`Failed to fetch job: ${response.status}`);
    }

    const job = await response.json();

    return NextResponse.json({ job });
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job details' },
      { status: 500 }
    );
  }
}

