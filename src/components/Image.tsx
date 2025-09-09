export default function Image({
  alt,
  src,
  className,
}: {
  alt: string;
  src: string;
  className: string;
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img className={className} src={src} alt={alt} />
  );
}
