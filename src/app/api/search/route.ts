import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { nanoid } from 'nanoid';

function getEnv() {
  const publicKey = process.env.STORYBLOCKS_API_KEY;
  const privateKey = process.env.STORYBLOCKS_SECRET_KEY;

  if (!publicKey || !privateKey) {
    console.warn('Missing API credentials');
  }

  return { publicKey, privateKey };
}

function isImageResults(data: unknown): data is ImageResults {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  return (
    typeof obj.total_results === 'number' &&
    Array.isArray(obj.results) &&
    obj.results.every((item: unknown) => {
      if (typeof item !== 'object' || item === null) return false;
      const result = item as Record<string, unknown>;
      return (
        typeof result.id === 'number' &&
        typeof result.title === 'string' &&
        typeof result.thumbnail_url === 'string' &&
        typeof result.preview_url === 'string'
      );
    })
  );
}

function buildImagesSearchUrl({
  query,
  page,
  per_page,
  publicKey,
  privateKey,
  user_id,
}: {
  query: string;
  page: number;
  per_page: number;
  publicKey: string;
  privateKey: string;
  user_id: string;
}) {
  const project_id = 'test-project-storyblocks-search';
  const baseUrl = 'https://api.storyblocks.com';
  const resource = '/api/v2/images/search';

  // HMAC generation
  const expires = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
  const hmacBuilder = createHmac('sha256', privateKey + expires);
  hmacBuilder.update(resource);
  const hmac = hmacBuilder.digest('hex');

  // Build the full URL with auth params
  const searchUrl = new URL(baseUrl + resource);
  searchUrl.searchParams.set('APIKEY', publicKey);
  searchUrl.searchParams.set('EXPIRES', expires.toString());
  searchUrl.searchParams.set('HMAC', hmac);

  // Add search parameters
  searchUrl.searchParams.set('keywords', query);
  searchUrl.searchParams.set('page', page.toString());
  searchUrl.searchParams.set('per_page', per_page.toString());
  searchUrl.searchParams.set('user_id', user_id);
  searchUrl.searchParams.set('project_id', project_id);

  return searchUrl;
}

export async function GET(request: NextRequest) {
  const { publicKey, privateKey } = getEnv();
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
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

  try {
    const searchUrl = buildImagesSearchUrl({
      query,
      page,
      per_page,
      publicKey,
      privateKey,
      user_id,
    });

    console.log(
      'Fetching from Storyblocks:',
      searchUrl
        .toString()
        .replace(/APIKEY=[^&]*/, 'APIKEY=***')
        .replace(/HMAC=[^&]*/, 'HMAC=***'),
    );

    const response = await fetch(searchUrl.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Storyblocks API error:', response.status, errorText);

      return NextResponse.json(
        { error: `Storyblocks API error: ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();

    if (!isImageResults(data)) {
      return NextResponse.json(
        { error: 'Unexpected API Response' },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
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
