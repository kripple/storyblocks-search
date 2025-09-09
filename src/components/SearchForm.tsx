import { IoIosSearch as SearchIcon } from 'react-icons/io';

export default function SearchForm({
  onChange,
  onSearch,
  isLoading,
  query,
  setQuery,
}: {
  onChange: () => void;
  onSearch: (query: string) => void;
  isLoading: boolean;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) {
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
    <form onSubmit={handleSubmit} className="flex justify-center mb-4 md:mb-8">
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
  );
}
