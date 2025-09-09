import { useState } from 'react';
import { IoIosSearch as SearchIcon } from 'react-icons/io';

export default function SearchForm({
  children,
  onChange,
  onSearch,
  isLoading,
  hasMore,
  resultsRemaining,
}: {
  children: ReactNode;
  onChange: () => void;
  onSearch: (query: string) => void;
  isLoading: boolean;
  hasMore?: boolean;
  resultsRemaining?: number;
}) {
  const [query, setQuery] = useState<string>('');

  const sanitizeInput = (value: string) =>
    value.replaceAll(/[^a-zA-Z0-9\s]/g, '');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isLoading || query === '') return;
    onSearch(query);
  };

  const handleChange = (event: ChangeEvent) => {
    onChange();
    const sanitized = sanitizeInput(event.target.value);
    setQuery(sanitized);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center mb-4 md:mb-8"
      >
        <label className="input input-accent input-lg rounded-full">
          <SearchIcon />
          <input
            type="search"
            placeholder="Search"
            autoComplete="off"
            autoCorrect="off"
            value={query}
            onChange={handleChange}
            name="query"
          />
        </label>
      </form>
      {children}
      {hasMore ? (
        <button className="btn btn-ghost mt-2 w-full">
          Load more results {resultsRemaining ? `(${resultsRemaining})` : null}
        </button>
      ) : null}
    </>
  );
}
