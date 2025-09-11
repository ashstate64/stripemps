import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

// Simple in-memory rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  // Use IP from headers as key
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'localhost';
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 2; // Only allow 2 requests per minute

  const record = requestCounts.get(key);

  if (!record || now > record.resetTime) {
    // First request or window expired
    requestCounts.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= maxRequests) {
    return true; // Rate limited
  }

  record.count++;
  return false;
}

export async function GET(request: NextRequest) {
  const key = getRateLimitKey(request);

  if (isRateLimited(key)) {
    return NextResponse.json(
      {
        error: 'Too Many Requests - This endpoint is not available',
        message:
          'Browser extension detected. Please disable financial data extensions.',
        retryAfter: 60,
      },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-RateLimit-Limit': '2',
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  // Return 404 for any remaining requests
  return NextResponse.json(
    {
      error: 'Market data API not available',
      message: 'This is an investment platform, not a market data service.',
      suggestion:
        'Disable financial browser extensions to stop these requests.',
    },
    {
      status: 404,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    }
  );
}

// Block all other methods aggressively
export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
