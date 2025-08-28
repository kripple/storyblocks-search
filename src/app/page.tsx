'use client';

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';

export default function HomePage() {
  const [results, setResults] = useState<ImageResults>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const keywords = query.replaceAll(' ', ',');
      const response = await fetch(`/api/search?query=${keywords}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const searchData: ImageResponseData = await response.json();
      setResults(searchData.results);
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Storyblocks Search</h1>

      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      <SearchResults
        results={results}
        isLoading={isLoading}
        error={error}
        hasSearched={hasSearched}
      />
    </div>
  );
}
