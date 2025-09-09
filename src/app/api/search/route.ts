import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { getEnv } from '@/app/api/lib/getEnv';
import { buildAuthenticatedUrl } from '@/app/api/lib/buildAuthenticatedUrl';
import { handleRequest } from '@/app/api/lib/handleRequest';
import { isSearchResults, isSearchEndpoint } from '@/app/api/lib/type-guards';
import { searchResponseData } from '@/app/api/lib/mockData';

export async function GET(request: NextRequest) {
  const { publicKey, privateKey } = getEnv();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const requestedResource = searchParams.get('resource');
  const resource = isSearchEndpoint(requestedResource)
    ? requestedResource
    : 'images';
  const page = parseInt(searchParams.get('page') || '1');
  const per_page = parseInt(searchParams.get('per_page') || '20');
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
    resource,
    publicKey,
    privateKey,
    user_id,
    additionalParams: {
      keywords: query,
      page: page.toString(),
      per_page: per_page.toString(),
    },
  });

  try {
    const response = await handleRequest({
      url: searchUrl,
      identifier: query,
      mockData: searchResponseData,
      logMessage: 'Fetching from Storyblocks:',
    });
    const data = await response.json();

    if (!isSearchResults(data)) {
      return NextResponse.json(
        { error: 'Unexpected API Response' },
        { status: 500 },
      );
    }

    const totalPages = Math.ceil(data.total_results / per_page);
    const resultsRemaining = data.total_results - (page * per_page);
    return NextResponse.json({
      data,
      pagination: {
        currentPage: page,
        totalPages,
        hasMore: page < totalPages,
        resultsRemaining
      },
      query,
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
