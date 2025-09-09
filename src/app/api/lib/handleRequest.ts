import { NextResponse } from 'next/server';
import { fetchData } from '@/app/api/lib/fetchData';
import type { searchResponseData } from '@/app/api/lib/mockData';

export async function handleRequest({
  url,
  identifier,
  mockData,
  logMessage,
}: {
  url: URL;
  identifier: string;
  mockData: typeof searchResponseData;
  logMessage: string;
}) {
  console.log(
    logMessage,
    url
      .toString()
      .replace(/APIKEY=[^&]*/, 'APIKEY=***')
      .replace(/HMAC=[^&]*/, 'HMAC=***'),
  );

  const response = await fetchData({
    identifier,
    url: url.toString(),
    mockData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Storyblocks API error:', response.status, errorText);

    return NextResponse.json(
      { error: `Storyblocks API error: ${response.status}` },
      { status: response.status },
    );
  }

  return response;
}
