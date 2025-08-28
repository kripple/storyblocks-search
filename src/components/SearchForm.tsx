import { useState } from 'react';

export default function SearchForm({
  onSearch,
  isLoading,
}: {
  onSearch: (query: string) => void;
  isLoading: boolean;
}) {
  const [query, setQuery] = useState<string>('');

  const sanitizeInput = (value: string) =>
    value.replaceAll(/[^a-zA-Z0-9\s]/g, '');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleChange = (event: ChangeEvent) => {
    const sanitized = sanitizeInput(event.target.value);
    setQuery(sanitized);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        autoCorrect="off"
        placeholder="Search for videos, images, or audio..."
        value={query}
        onChange={handleChange}
        name="query"
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
