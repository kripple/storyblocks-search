export function isImageResults(data: unknown): data is ImageResult[] {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;

  return (
    typeof obj.total_results === 'number' &&
    Array.isArray(obj.results) &&
    obj.results.every((item: unknown) => {
      if (typeof item !== 'object' || item === null) return false;
      const result = item as Record<string, unknown>;
      return (
        typeof result.id === 'number' &&
        typeof result.title === 'string' &&
        typeof result.thumbnail_url === 'string' &&
        typeof result.preview_url === 'string'
      );
    })
  );
}
