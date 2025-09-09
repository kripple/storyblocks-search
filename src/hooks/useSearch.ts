'use client';

import { useMutation } from '@tanstack/react-query';

export function useSearch() {
  const search = useMutation<SearchResponse, Error, SearchParams>({
    mutationFn: async ({ page, ...searchParams }) => {
      const params = new URLSearchParams({
        ...searchParams,
        page: (page || 1).toString(),
      });
      const response = await fetch(`/api/search?${params}`);
      if (!response.ok) {
        throw new Error('Search failed');
      }
      return response.json();
    },
  });
  return (params: SearchParams) => search.mutateAsync(params);
}
