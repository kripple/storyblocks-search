declare type ChangeEvent = import('react').ChangeEvent<HTMLInputElement>;
declare type FormEvent = import('react').FormEvent<HTMLFormElement>;
declare type ReactNode = import('react').ReactNode;

declare type AudioAttributes = {
  contentClass: 'audio';
  preview_url: string;
  waveform_url: string;
  duration: number;
  bpm: number | null;
};

declare type ImageAttributes = {
  contentClass: 'image';
  preview_url: string;
};

declare type VideoAttributes = {
  contentClass: 'video';
  duration: number;
  preview_urls: Record<string, string>;
};

declare type SearchResult = {
  id: number;
  title: string;
  thumbnail_url: string;
  type: string;
  is_new: boolean;
  description?: string;
  aspectRatio?: string;
} & (AudioAttributes | ImageAttributes | VideoAttributes);

declare type SearchResponseData = {
  total_results: number;
  results: SearchResult[];
};

declare type SearchEndpoint = 'videos' | 'audio' | 'images';
