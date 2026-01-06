import { NextRequest, NextResponse } from 'next/server';

interface SmartRecruitersToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface CandidateResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Cache token in memory (shared with jobs route)
let cachedToken: { token: string; expiresAt: number } | null = null;

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

async function getAccessToken(): Promise<string> {
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

  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  return data.access_token;
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' };
  }
  
  const firstName = parts[0];
  const lastName = parts.slice(1).join(' ');
  
  return { firstName, lastName };
}

async function createCandidate(
  accessToken: string,
  firstName: string,
  lastName: string,
  email: string
): Promise<CandidateResponse> {
  const response = await fetch('https://api.smartrecruiters.com/candidates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      firstName,
      lastName: lastName || firstName, // SR requires lastName, use firstName if not provided
      email,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create candidate: ${response.status} - ${errorText}`);
  }

  return response.json();
}

async function uploadAttachment(
  accessToken: string,
  candidateId: string,
  file: File
): Promise<void> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'RESUME');

  const response = await fetch(
    `https://api.smartrecruiters.com/candidates/${candidateId}/attachments`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to upload attachment: ${response.status} - ${errorText}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const file = formData.get('file') as File;

    // Validate required fields
    if (!name || !email || !file) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and file are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed types: PDF, DOC, DOCX' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size: 10MB' },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();
    const { firstName, lastName } = splitName(name);

    // Create candidate in SmartRecruiters
    const candidate = await createCandidate(accessToken, firstName, lastName, email);

    // Upload CV attachment
    await uploadAttachment(accessToken, candidate.id, file);

    return NextResponse.json({
      success: true,
      candidateId: candidate.id,
    });
  } catch (error) {
    console.error('Error creating candidate:', error);
    
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}

