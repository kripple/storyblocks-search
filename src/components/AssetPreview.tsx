import Image from '@/components/Image';

export default function AssetPreview({
  open,
  description,
  imageSrc,
  audioSrc,
  videoSources,
  onClose,
}: {
  open: boolean;
  description: string;
  imageSrc: string;
  audioSrc?: string;
  videoSources?: Record<string, string>;
  onClose: () => void;
}) {
  const image = (
    <Image
      src={imageSrc}
      alt={description}
      className="max-w-full max-h-full object-contain rounded-md"
    />
  );

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center p-8 ${
        open ? 'opacity-100 z-50' : 'opacity-0 z-[-1] pointer-events-none'
      }`}
      onClick={onClose}
    >
      <button
        className="btn btn-sm btn-circle btn-accent absolute right-4 top-4 z-10"
        onClick={onClose}
      >
        ✕
      </button>

      <div className="flex items-center justify-center min-h-0">
        {videoSources ? (
          <video
            className="max-w-full max-h-full object-contain rounded-md"
            controls
          >
            {Object.entries(videoSources).map(([resolution, src]) => (
              <source key={resolution} src={src} />
            ))}
            Your browser does not support the video element.
          </video>
        ) : audioSrc ? (
          <>
            {image}
            <audio
              controls
              className="max-w-full max-h-full object-contain rounded-md"
            >
              <source src={audioSrc} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </>
        ) : (
          image
        )}
      </div>

      <div className="flex-shrink-0 bg-base-100 bg-opacity-95 backdrop-blur-sm p-4 mt-4 rounded-full">
        <h3 className="text-center font-semibold">{description}</h3>
      </div>
    </div>
  );
}
