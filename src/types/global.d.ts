declare type ChangeEvent = import('react').ChangeEvent<HTMLInputElement>;
declare type FormEvent = import('react').FormEvent<HTMLFormElement>;
declare type ReactNode = import('react').ReactNode;

declare type ImageResult = {
  id: number;
  title: string;
  thumbnail_url: string;
  preview_url: string;
};

declare type ImageResponseData = {
  total_results: number;
  results: ImageResult[];
};

declare type SearchEndpoint = 'videos' | 'audio' | 'images';
