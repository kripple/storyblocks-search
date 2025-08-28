export default function AssetPreview({
  open,
  description,
  preview_url,
  onClose,
}: {
  open: boolean;
  description: string;
  preview_url: string;
  onClose: () => void;
}) {
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="max-w-full max-h-full object-contain rounded-md"
          src={preview_url}
          alt={description}
        />
      </div>

      <div className="flex-shrink-0 bg-base-100 bg-opacity-95 backdrop-blur-sm p-4 mt-4 rounded-full">
        <h3 className="text-center font-semibold">{description}</h3>
      </div>
    </div>
  );
}
