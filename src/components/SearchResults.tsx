export default function SearchResults({
  results,
  isLoading,
  error,
  hasSearched,
}: {
  results: ImageResults;
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  if (hasSearched && results.length === 0) {
    return <p>No results found.</p>;
  }

  if (!hasSearched || results.length === 0) {
    return null;
  }

  return (
    <div>
      {results.map((result) => (
        <div key={result.id}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.thumbnail_url}
            alt={result.title}
            width={100}
            height={100}
          />
          <h3>{result.title}</h3>
        </div>
      ))}
    </div>
  );
}
