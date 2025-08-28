declare type ChangeEvent = import('react').ChangeEvent<HTMLInputElement>;
declare type FormEvent = import('react').FormEvent<HTMLFormElement>;
declare type ReactNode = import('react').ReactNode;

declare type ImageResults = ({
  id: number;
  title: string;
  thumbnail_url: string;
  preview_url: string;
} & Record<string, string | number | boolean>)[];

declare type ImageResponseData = {
  total_results: number;
  results: ImageResults;
};
