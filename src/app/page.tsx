'use client';

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import SearchResults from '@/components/SearchResults';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [hasSearched, setHasSearched] = useState(false);
  const resources: SearchEndpoint[] = ['audio', 'images', 'videos'];
  type ResourceId = 0 | 1 | 2;
  const [resourceId, setResourceId] = useState<ResourceId>(1);
  const resource = resources[resourceId];
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(undefined);
    setHasSearched(true);

    try {
      const keywords = query.replaceAll(' ', ',');
      const params = new URLSearchParams({
        query: keywords,
        resource,
      });
      const response = await fetch(`/api/search?${params}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`,
        );
      }

      const searchData: SearchResponseData = await response.json();
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

  const chevronDown = (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  const resourceToString = (value: SearchEndpoint) =>
    value.endsWith('s') ? value.slice(0, -1) : value;

  return (
    <div className="container mx-auto p-1 sm:p-2 md:p-4 lg:p-8">
      <h1 className="text-center text-4xl font-bold font-serif mt-4 mb-4 md:mb-8 flex justify-center items-center gap-2 flex-wrap">
        Storyblocks
        <div className="dropdown">
          <span
            tabIndex={0}
            role="button"
            className="capitalize btn btn-xl btn-ghost text-4xl rounded-sm p-4 w-46 h-16"
          >
            {resourceToString(resource)}{' '}
            <span className="ml-1 p-1">{chevronDown}</span>
          </span>
          <ul tabIndex={0} className="dropdown-content menu z-1 w-46">
            {resources.map((item, index) =>
              index === resourceId ? null : (
                <li
                  onClick={() => setResourceId(index as ResourceId)}
                  className={`btn ${
                    index === 0
                      ? 'btn-primary'
                      : index === 1
                      ? 'btn-secondary'
                      : 'btn-accent'
                  } btn-soft text-4xl capitalize p-4 py-8 shadow-sm mb-2 h-16`}
                  key={item}
                >
                  {resourceToString(item)}
                </li>
              ),
            )}
          </ul>
        </div>
        Search
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
