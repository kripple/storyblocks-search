export default function Image({ alt, src }: { alt: string; src: string }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      className={`rounded-md w-full h-full aspect-square object-cover object-top`}
      src={src}
      alt={alt}
    />
  );
}
