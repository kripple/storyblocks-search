import { NextResponse } from 'next/server';
import { fetchData } from '@/app/api/lib/fetchData';
import type { searchResponseData } from '@/app/api/lib/mockData';

export async function handleRequest({
  url,
  identifier,
  mockData,
  validator,
  logMessage,
}: {
  url: URL;
  identifier: string;
  mockData: typeof searchResponseData;
  validator: (data: unknown) => boolean;
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

  const data = await response.json();

  if (!validator(data)) {
    return NextResponse.json(
      { error: 'Unexpected API Response' },
      { status: 500 },
    );
  }

  return NextResponse.json(data);
}
