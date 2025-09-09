import AssetCard from '@/components/AssetCard';
import SquareGrid from '@/components/SquareGrid';

export default function SearchResults({
  results,
  isLoading,
  error,
}: {
  results: SearchResult[];
  isLoading: boolean;
  error: string | false;
}) {
  const alertClass = 'alert h-32 flex justify-center rounded-lg';

  return (
    <>
      {isLoading ? (
        <div data-testid="LoadingSearchResults" className={alertClass}>
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : error ? (
        <div
          role="alert"
          data-testid="SearchError"
          className={`alert-error alert-dash ${alertClass}`}
        >
          <span>An unexpected error occured, please try again later.</span>
        </div>
      ) : results.length === 0 ? (
        <div
          role="alert"
          data-testid="NoResults"
          className={`alert-info alert-dash ${alertClass}`}
        >
          <span>No results found.</span>
        </div>
      ) : (
        <SquareGrid
          items={results.map((result) => {
            return {
              key: result.id,
              item: <AssetCard {...result} />,
            };
          })}
        />
      )}
    </>
  );
}
