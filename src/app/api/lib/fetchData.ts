import type { searchResponseData } from '@/app/api/lib/mockData';

export async function fetchData({
  identifier,
  url,
  mockData,
}: {
  identifier: string;
  url: string;
  mockData: typeof searchResponseData;
}) {
  const useMockData =
    process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

  if (!useMockData) {
    const response = await fetch(url);
    return response;
  }

  console.log(`Using mock data for: ${identifier}`);

  if (identifier === 'loading') {
    await new Promise(() => {});
  }

  if (identifier === 'error') {
    return new Response(JSON.stringify({ error: 'Mock API Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (identifier === 'empty') {
    return new Response(
      JSON.stringify({
        total_results: 0,
        results: [],
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }

  return new Response(JSON.stringify(mockData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
