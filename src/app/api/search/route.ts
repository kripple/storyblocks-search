import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { getEnv } from '@/app/api/lib/getEnv';
import { buildAuthenticatedUrl } from '@/app/api/lib/buildAuthenticatedUrl';
import { handleRequest } from '@/app/api/lib/handleRequest';
import { isImageResults, isSearchEndpoint } from '@/app/api/lib/type-guards';
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
