'use client';

import { useMutation } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useInfiniteSearch(searchParams: SearchParams) {
  return useInfiniteQuery({
    queryKey: ['search', searchParams],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        ...searchParams,
        page: pageParam.toString(),
      });
      const response = await fetch(`/api/search?${params}`);
      if (!response.ok) throw new Error('Search failed');
      return response.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      // Return next page number or undefined if no more pages
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
}

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
