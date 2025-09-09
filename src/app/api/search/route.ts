import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { getEnv } from '@/app/api/lib/getEnv';
import { buildAuthenticatedUrl } from '@/app/api/lib/buildAuthenticatedUrl';
import { handleRequest } from '@/app/api/lib/handleRequest';
import { isImageResults } from '@/app/api/lib/type-guards';
import { searchResponseData } from '@/app/api/lib/mockData';

export async function GET(request: NextRequest) {
  const { publicKey, privateKey } = getEnv();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const page = parseInt(searchParams.get('page') || '1');
  const results_per_page = parseInt(
    searchParams.get('results_per_page') || '20',
  );
  const user_id = 'test-user-' + nanoid();

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 },
    );
  }

  if (!publicKey || !privateKey) {
    return NextResponse.json(
      { error: 'Missing API credentials' },
      { status: 500 },
    );
  }

  const searchUrl = buildAuthenticatedUrl({
    resource: '/api/v2/images/search',
    publicKey,
    privateKey,
    user_id,
    additionalParams: {
      keywords: query,
      page: page.toString(),
      results_per_page: results_per_page.toString(),
    },
  });

  try {
    return await handleRequest({
      url: searchUrl,
      identifier: query,
      mockData: searchResponseData,
      validator: isImageResults,
      logMessage: 'Fetching from Storyblocks:',
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 },
    );
  }
}
