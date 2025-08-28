'use client';

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';

export default function HomePage() {
  const [results, setResults] = useState<ImageResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(undefined);
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

  const handleChange = () => {
    if (isLoading) return;

    if (error) {
      setError(undefined);
    }
    if (results.length === 0) {
      setHasSearched(false);
    }
  };

  return (
    <div className="container mx-auto p-1 sm:p-2 md:p-4 lg:p-8">
      <h1 className="text-center text-4xl font-bold font-serif mt-4 mb-4 md:mb-8">
        Storyblocks Image Search
      </h1>

      <SearchForm
        onSearch={handleSearch}
        isLoading={isLoading}
        onChange={handleChange}
      />

      {hasSearched ? (
        <SearchResults results={results} isLoading={isLoading} error={error} />
      ) : null}
    </div>
  );
}
