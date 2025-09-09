export function isSearchResults(data: unknown): data is SearchResponse['data'] {
  if (typeof data !== 'object' || data === null) return false;

  const obj = data as Record<string, unknown>;

  if (!(typeof obj.total_results === 'number' && Array.isArray(obj.results))) {
    return false;
  }

  return obj.results.every((item: unknown) => {
    if (!isSearchResult(item)) return false;
    return isAudioResult(item) || isImageResult(item) || isVideoResult(item);
  });
}

function isSearchResult(item: unknown): item is SearchResult {
  if (typeof item !== 'object' || item === null) return false;

  const result = item as Record<string, unknown>;

  if (
    !(
      typeof result.id === 'number' &&
      typeof result.title === 'string' &&
      typeof result.thumbnail_url === 'string' &&
      typeof result.contentClass === 'string' &&
      ['video', 'audio', 'image'].includes(result.contentClass)
    )
  ) {
    return false;
  }

  if (
    !(typeof result.type === 'string' && typeof result.is_new === 'boolean')
  ) {
    console.warn('Optional attributes are missing or unreadable');
  }

  return true;
}

function isAudioResult(item: Record<string, unknown>): boolean {
  if (
    !(item.contentClass === 'audio' && typeof item.preview_url === 'string')
  ) {
    return false;
  }
  if (
    !(
      typeof item.duration === 'number' &&
      typeof item.bpm === 'number' &&
      typeof item.waveform_url === 'string'
    )
  ) {
    console.warn('Optional audio attributes are missing or unreadable');
  }
  return true;
}

function isImageResult(item: Record<string, unknown>): boolean {
  return item.contentClass === 'image' && typeof item.preview_url === 'string';
}

function isVideoResult(item: Record<string, unknown>): boolean {
  if (
    !(item.contentClass === 'video') &&
    item.preview_urls &&
    typeof item.preview_urls === 'object' &&
    Object.keys(item.preview_urls).length > 0 &&
    Object.entries(item.preview_urls).every(
      ([key, value]) => typeof key === 'string' && typeof value === 'string',
    )
  ) {
    return false;
  }

  if (!(typeof item.duration === 'number')) {
    console.warn('Optional audio attributes are missing or unreadable');
  }

  return true;
}

export function isSearchEndpoint(value?: string): value is SearchEndpoint {
  return ['images', 'audio', 'videos'].includes(value);
}
