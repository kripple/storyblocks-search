import { useState } from 'react';
import Image from '@/components/Image';
import AssetPreview from '@/components/AssetPreview';

export default function AssetCard({
  preview_url,
  thumbnail_url,
  title,
}: {
  preview_url: string;
  thumbnail_url: string;
  title: string;
}) {
  const [, setShowPreview] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const image = <Image src={thumbnail_url} alt={title} />;
  const [isVisible, setIsVisible] = useState(false);

  const openPreview = () => {
    setShowPreview(true);
    setIsHovered(false);
    setTimeout(() => setIsVisible(true), 10); // Small delay for transition
  };

  const closePreview = () => {
    setIsVisible(false);
    setIsHovered(false);
    setTimeout(() => setShowPreview(false), 300); // Match transition duration
  };

  const base = (
    <div
      data-testid="AssetCard"
      className={`flex flex-row gap-2 p-0 rounded-lg relative aspect-square w-full h-full`}
    >
      <div className="avatar">{image}</div>
    </div>
  );

  const overlay = (
    <div
      data-testid="AssetCardOverlay"
      className={`absolute top-0 card image-full flex flex-row gap-2 p-0 rounded-lg aspect-square ${
        isHovered ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300 w-full h-full`}
    >
      <figure
        className={`rounded-md relative h-full w-full flex justify-center`}
      >
        {image}
      </figure>
      <div className="card-body p-0 m-2 lg:m-3 aspect-square overflow-hidden text-xs md:text-sm lg:text-base">
        {title}
      </div>
    </div>
  );

  return (
    <>
      <div
        onClick={openPreview}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="relative cursor-pointer rounded-lg"
      >
        {base}
        {overlay}
      </div>

      <AssetPreview
        open={isVisible}
        onClose={closePreview}
        preview_url={preview_url}
        description={title}
      />
    </>
  );
}
